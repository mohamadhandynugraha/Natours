const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => console.log('connect db localhost success', con.connections));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'a tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The park camper',
    price: 4.8
});

testTour
    .save()
    .then(doc => {
        console.log(doc);
    })
    .catch(err => console.log(err));

/**
 * START SERVER
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
