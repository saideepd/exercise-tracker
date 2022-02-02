const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const router = express.Router();
const user = require('./functions/user');

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


router.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

router.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

router.post("/api/users", (req, res, next) => {
    let username = req.body.username;
    console.log(`User Input: ${username}`);

    if (!username || username === undefined || typeof username === undefined || username === '') {
        console.log(`Invalid or blank username input`);
        res.json({ error: "Invalid username input" });
        return next({ error: "Invalid username input" });
    }
    
    user.createUser(username, (err, responseData) => {
        if (err) {
            console.log(`Error creating user: ${err}`);
            res.status(400).json({ error: err });
            return next(err);
        }
        else if (!responseData) {
            console.log('Missing `done()` argument');
            res.status(500).json({ error: "Error creating record" });
            return next({ error: "Error creating record" });
        }
        else if (responseData.toString().toLowerCase().includes('error' || 'exists' || 'already')) {
            console.log(`Error in create user response data: ${JSON.stringify(responseData)}`);
            res.status(422).json({ error: "Username already taken. Please try again with another username." });
        }
        else if (Object.entries.length == 0) {
            res.status(422).json({ error: "Error creating user" });
        }
        else {
            console.log(`Create User Response Data: ${responseData}`);
            res.status(201).json({ _id: responseData.id, username: responseData.username });
        }
    });
});


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports.handler = serverless(app);