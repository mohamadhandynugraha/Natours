const Tour = require('../models/tourModel');

// check body request
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'There is no name and price in the tour!'
        });
    }

    next();
};

/**
 * Route handlers
 */

exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success'
        // results: tours.length,
        // data: {
        //     tours
        // }
    }); // akhir dari req -> res cycle
};

exports.getTour = (req, res) => {
    // munculkan data dari id
    // convert id dulu dari req.params.id -> jadi number
    // const id = req.params.id * 1;
    // const tour = tours.find(element => element.id === id);

    // check if id is less than tours array, jika lebih besar dari array maka tampilkan 404

    res.status(200).json({
        message: 'success',
        requestAtTime: req.requesTime
        // data: {
        //     tour
        // }
    });
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: 'success'
        // data: {
        //     tour: newTour
        // }
    });
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
