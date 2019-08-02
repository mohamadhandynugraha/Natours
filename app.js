const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

/**
 * 1. Middleware
 */

// ini middleware pake morgan, 3rd party middleware
app.use(morgan('dev'));

// kode dibawah ini merupakan middleware
// .use digunakan untuk implementasi middleware dan menambahkannya ke middleware stack
app.use(express.json());

// teorinya middleware function di express bisa mengakses req, res dan next function
// biasanya middleware diletakkan sebelum routing
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next(); // selalu menggunakan next() karena ini kuncinya pada konsep middleware express
});

// sekarang mau coba tambahkan waktu dan tanggal
app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

// synchronus version to get data simpletour.Jefferson
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * 2. route handlers
 * ---------------------------------------------
 * Route handlers
 */

const getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
        results: tours.length,
        data: {
            tours
        }
    }); // akhir dari req -> res cycle
};

const getTour = (req, res) => {
    // munculkan data dari id
    // convert id dulu dari req.params.id -> jadi number
    const id = req.params.id * 1;
    const tour = tours.find(element => element.id === id);

    // check if id is less than tours array, jika lebih besar dari array maka tampilkan 404
    if (id < tours.length - 1) {
        res.status(200).json({
            message: 'success',
            requestAtTime: req.requesTime,
            data: {
                tour
            }
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: '404 Data not found'
        });
    }
};

const createTour = (req, res) => {
    // disini kita buat new tour dengan id baru, untuk sekarang belum ada db, jadi generate id manual
    const newId = tours[tours.length - 1].id + 14;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
};

const updateTour = (req, res) => {
    // kita disini masih belum update secara langsung, karena masih terlalu awal untuk update database
    // karena pekerjaan update data membutuhkan kerja yang banyak
    if (req.params.id * 1 < tours.length) {
        res.status(200).json({
            status: 'success',
            data: {
                tour: '<updated in the later section.......>'
            }
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: '404 data not found'
        });
    }
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 < tours.length) {
        res.status(200).json({
            status: 'success',
            data: {
                tour: '<delete in the later section....>'
            }
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: '404 id or data not found'
        });
    }
};

/**
 * User ROUTE
 */
const getAllUsers = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : `This route hasn't been defined`
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : `This route hasn't been defined`
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : `This route hasn't been defined`
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : `This route hasn't been defined`
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : `This route hasn't been defined`
    })
}


// kita mau mounting router
const tourRouter = express.Router()
const userRouter = express.Router()

// bikin route yang lebih simple
/**
 * 3. ROUTES
 */
tourRouter.route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

// user ROUTES
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
/**
 * 4. Start server
 */
const port = 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
