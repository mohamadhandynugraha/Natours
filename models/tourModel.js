const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'a tour must have a name'],
            unique: true,
            // MENAMBAHKAN VALIDATOR LAGI PADA NAME
            trim: true,
            maxlength: [
                40,
                'a tour must have less than or equal 40 characters'
            ],
            minlength: [10, 'a tour must have more than or equal 10 characters']
            // validate: [
            //     validator.isAlpha,
            //     'Tour name must only contains characters'
            // ]
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
            required: [true, 'a tour must have difficulty'],
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: 'Difficulty is either: easy, medium or difficult'
            }
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must above 1'],
            max: [5, 'Rating must below or equal 5']
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price']
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function(val) {
                    // THIS ONLY POINTS TO CURRENT DOC ON NEW DOCUMENT CREATION
                    return val < this.price;
                },
                message:
                    'Discount price ({VALUE}) should be below regular price'
            }
        },
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
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false
        }
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

// QUERY MIDDLEWARE IN MONGOOSE. FIND apapun. PRE HOOKS
tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } });

    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
});

// TOUR AGGREGATION MIDDLEWARE, PRE HOOKS
tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this);
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
