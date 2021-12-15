const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const event = require('./routes/cocktails');
const user = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

const port = 8001;

app.use('/cocktails', event);
app.use('/users', user);


const run = async () => {
    await mongoose.connect('mongodb://localhost/cocktails');

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run();


