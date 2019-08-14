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
/**
 * START SERVER
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening from port ${port}`);
});
