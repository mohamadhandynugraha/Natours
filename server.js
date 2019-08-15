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
    .then(() => console.log('connect db localhost success'));
/**
 * START SERVER
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
