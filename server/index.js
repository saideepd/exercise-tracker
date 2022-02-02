const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();

app.listen();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Adding body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Hide X-powered-by header ;)
app.use(function (req, res, next) {
    res.header("X-powered-by", "Efforts, Sweat, Dedication and Desire");
    next();
});

// Connect to Mongo DB
let connection = mongoose.connect
    (process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


app.get("/api", (req, res) => {
    res.json({ message: "Hellp from Express!" });
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;