const express = require('express');
const morgan = require('morgan');
const app = express();

// import routernya
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/**
 * MIDDLEWARE
 */

// ini middleware pake morgan, 3rd party middleware
app.use(morgan('dev'));

// kode dibawah ini merupakan middleware
// .use digunakan untuk implementasi middleware dan menambahkannya ke middleware stack
app.use(express.json());

// teorinya middleware function di express bisa mengakses req, res dan next function
// biasanya middleware diletakkan sebelum routing
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next(); // selalu menggunakan next() karena ini kuncinya pada konsep middleware express
});

// sekarang mau coba tambahkan waktu dan tanggal
app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

// ROUTES, MIDDLEWARE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
