const express = require('express');

// import tourController
const tourController = require('./../controller/tourController')

// bikin variable router, (inisialisasi router)
const router = express.Router();

router.param('id', tourController.checkID)

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
