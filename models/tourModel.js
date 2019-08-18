const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'a tour must have a name'],
            unique: true
        },
        slug: String,
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
        price: {
            type: Number,
            required: [true, 'A tour must have a price']
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
            default: Date.now(),
            select: false
        },
        startDates: [Date]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// DEFINE VIRTUAL PROPERTIES TOUR SCHEMA
// VIRTUAL PROPERTIES GAK BISA DI QUERY, KARENA TIDAK NYAMBUNG KE DATABASE
tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

// DEFINE DOCUMENT MIDDLEWARE IN MONGOOSE, RUNS BEFORE .save() and .create()
// PRE HOOKS
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save', function(next) {
//     console.log('will save the document.');
//     next();
// });

// // DEFINE DOCUMENT MIDDLEWARE IN MONGOOSE, RUNS ERFORE .save() and .create()
// // POST HOOKS
// tourSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
