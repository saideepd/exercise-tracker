const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.listen();

// enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Hide X-powered-by header ;)
app.use(function (req, res, next) {
    res.header("X-powered-by", "Efforts, Sweat, Dedication and Desire");
    next();
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