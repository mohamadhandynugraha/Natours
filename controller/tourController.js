const fs = require('fs');

// synchronus version to get data simpletour api
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// kita buat param middleware, supaya gak ngulang2 kodingan yang sama persis ber kali2
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id: ${val}`)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        });
    }
    next();
};

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

    res.status(200).json({
        message: 'success',
        requestAtTime: req.requesTime,
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // disini kita buat new tour dengan id baru, untuk sekarang belum ada db, jadi generate id manual
    const newId = tours[tours.length - 1].id + 1;
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

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated in the later section.......>'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<delete in the later section....>'
        }
    });
};
