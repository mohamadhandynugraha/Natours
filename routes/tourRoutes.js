const express = require('express');

// import tourController
const tourController = require('./../controller/tourController');

// bikin variable router, (inisialisasi router)
const router = express.Router();

router.param('id', tourController.checkID);

// create a checkBody middleware
// check if the request body has a property name and price
// if not send 400
// add to post handler stack

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

// export routernya, supaya bisa digunakan sama file lacinia
module.exports = router;
