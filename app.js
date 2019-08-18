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
// menambahkan if untuk cek node env pada mode development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// kode dibawah ini merupakan middleware
// .use digunakan untuk implementasi middleware dan menambahkannya ke middleware stack
app.use(express.json());

// teorinya middleware function di express bisa mengakses req, res dan next function
// biasanya middleware diletakkan sebelum routing
// app.use((req, res, next) => {
//     console.log('Hello from the middleware');
//     next(); // selalu menggunakan next() karena ini kuncinya pada konsep middleware express
// });

// sekarang mau coba tambahkan waktu dan tanggal
app.use((req, res, next) => {
    req.requesTime = new Date().toISOString();
    next();
});

// ROUTES, MIDDLEWARE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// HANDLING ROUTE YANG GAK KITA BIKIN
// MISALKAN ROUTE /API/TOURS/QWERTY     <-- RUTE INI TIDAK KITA BIKIN. KALAU KITA REQ RUTE TSB AKAN ADA ERROR CANNOT GET ROUTE HTML
// SOLUSINYA PAKE APP.ALL DARI EXPRESS
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // });

    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

module.exports = app;
