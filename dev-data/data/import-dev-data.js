const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('connect db localhost success'));

// READ the FILE
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(JSON.parse(tours));
        console.log('Data successful into DB');
    } catch (error) {
        console.log(error);
    }
};

// DELETE DATA ALL FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('data successfully delete');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
