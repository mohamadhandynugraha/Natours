const fs = require('fs');

// synchronus version to get data simpletour api
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/**
 * Route handlers
 */

exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
        results: tours.length,
        data: {
            tours
        }
    }); // akhir dari req -> res cycle
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
    // disini kita buat new tour dengan id baru, untuk sekarang belum ada db, jadi generate id manual
    const newId = tours[tours.length - 1].id + 14;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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