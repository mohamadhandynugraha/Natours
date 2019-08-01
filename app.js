const express = require('express');
const app = express();

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

const port = 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
