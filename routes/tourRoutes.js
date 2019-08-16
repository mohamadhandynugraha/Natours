const express = require('express');

// import tourController
const tourController = require('./../controller/tourController');

// bikin variable router, (inisialisasi router)
const router = express.Router();

// menambahkan aliasing top 5 cheap tours
router
    .route('/top-5-tours')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

// export routernya, supaya bisa digunakan sama file lacinia
module.exports = router;
