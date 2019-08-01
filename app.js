const fs = require('fs');
const express = require('express');
const app = express();

// kode dibawah ini merupakan middleware
app.use(express.json());

// synchronus version to get data simpletour.Jefferson
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get url request
app.get('/', (req, res) => {
    res.status(200).json({
        message: `Hello from the server ${req}`,
        app: 'Natours API build'
    });
});

// post url request
app.post('/user', (req, res) => {
    res.send('You can post to this user url');
});

// api v1 get simple tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        message: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

// api v1 post to create a new tours
// kalau kodingan ini mau dapetin body dari request Kalau gak pake middleware error dia
app.post('/api/v1/tours', (req, res) => {
    // disini kita buat new tour dengan id baru, untuk sekarang belum ada db, jadi generate id manual
    const newId = tours[tours.length - 1].id + 14;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
