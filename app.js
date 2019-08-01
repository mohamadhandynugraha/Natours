const fs = require('fs');
const express = require('express');
const app = express();

// kode dibawah ini merupakan middleware
app.use(express.json());

// synchronus version to get data simpletour.Jefferson
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
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

// // api v1 get simple tours
// app.get('/api/v1/tours', getAllTours);

// // api v1 get simple tours id, using params
// // optional params -> using this -> ? /api/v1/tours/:id/:category?
// app.get('/api/v1/tours/:id/', getTour)

// // api v1 post to create a new tours
// // kalau kodingan ini mau dapetin body dari request Kalau gak pake middleware error dia
// app.post('/api/v1/tours', createTour);

// // update api v1 simple tour api using patch
// app.patch('/api/v1/tours/:id', updateTour)

// // delete api v1 simple tour
// app.delete('/api/v1/tours/:id', deleteTour)

// bikin route yang lebih simple
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});