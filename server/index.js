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

// Default API Endpoint
router.get("/api", (req, res) => {
    res.json({ message: "Hello from Exercise Tracker!" });
});

// Test Hello Endpoint
router.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

// Create User API Endpoint
router.post("/api/users", (req, res, next) => {
    let username = req.body.username;
    console.log(`User Input: ${username}`);

    // Error handling for invalid input
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

// Find User By Id API Endpoint
router.get("/api/users/:_id", (req, res, next) => {
    let userId = req.params._id;
    console.log(`User Input: ${userId}`);

    // Error handling for invalid input
    if (!userId || userId === undefined || typeof userId === undefined || userId === '') {
        console.log(`Invalid or blank userId input`);
        res.json({ error: "Invalid userId input" });
        return next({ error: "Invalid userId input" });
    }

    user.findUserById(userId, (err, responseData) => {
        if (err) {
            console.log(`Error finding user: ${err}`);
            res.status(400).json({ error: err });
            return next(err);
        }
        else if (!responseData) {
            console.log('Missing `done()` argument');
            res.status(400).json({ error: "Error finding user record" });
            return next({ error: "Error finding user record" });
        }
        else if (responseData.toString().toLowerCase().includes('error' || 'exists' || 'already')) {
            console.log(`Error in findUserById response data: ${JSON.stringify(responseData)}`);
            res.status(400).json({ error: "User does not exists with provided id. Please try again with correct user id." });
        }
        else if (Object.entries.length == 0) {
            res.status(400).json({ error: "Error finding user" });
        }
        else {
            console.log(`Find User By Id Response Data: ${responseData}`);
            res.status(200).json({ _id: responseData.id, username: responseData.username });
        }
    });
});

// Find User By Username API Endpoint
router.get("/api/username/:username", (req, res, next) => {
    let userName = req.params.username;
    console.log(`User Input: ${userName}`);

    // Error handling for invalid input
    if (!userName || userName === undefined || typeof userName === undefined || userName === '') {
        console.log(`Invalid or blank username input`);
        res.json({ error: "Invalid username input" });
        return next({ error: "Invalid username input" });
    }

    user.findUserByUsername(userName, (err, responseData) => {
        if (err) {
            console.log(`Error finding user: ${err}`);
            res.status(400).json({ error: err });
            return next(err);
        }
        else if (!responseData) {
            console.log('Missing `done()` argument');
            res.status(400).json({ error: "Error finding user record" });
            return next({ error: "Error finding user record" });
        }
        else if (responseData.toString().toLowerCase().includes('error' || 'exists' || 'already')) {
            console.log(`Error in findUserByUsername response data: ${JSON.stringify(responseData)}`);
            res.status(400).json({ error: "User does not exists with provided username. Please try again with correct username." });
        }
        else if (Object.entries.length == 0) {
            res.status(400).json({ error: "Error finding user" });
        }
        else {
            console.log(`Find By Username Response Data: ${responseData}`);
            res.status(200).json({ _id: responseData.id, username: responseData.username });
        }
    });
});


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports.handler = serverless(app);