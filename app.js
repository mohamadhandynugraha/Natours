const fs = require('fs')
const express = require('express');
const app = express();

// synchronus version to get data simpletour.Jefferson
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// get url request
app.get('/', (req, res) => {
    res.status(200).json({
        message: `Hello from the server ${req}`,
        app: 'Natours API build'
    });
});

// post url request
app.post('/user', (req, res) => {
    res.send('You can post to this user url')
})

// api v1 get simple tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        message: 'success',
        data: {
            tours
        }
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
