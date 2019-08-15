const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'a tour must have durations']
    },
    maxGroupSize: {
        type: Number,
        required: [true, ' a tour must have group size']
    },
    difficulty: {
        type: String,
        required: [true, 'a tour must have difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'a tour must have summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'a tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
