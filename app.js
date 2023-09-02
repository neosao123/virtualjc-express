const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./db/connect');
const routes = require("./routes/index.routes");
const cors = require("cors");
var path = require('path');
const app = express();
const fs = require("fs");
require('dotenv').config();
const morgan = require('morgan');
const Log = require("./models/logEntries.model");

var PdfPrinter = require('pdfmake');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const logger = async (req, res, next) => {
    const { method, url, headers, } = req;
    let logEntry = await new Log({ method, url, headers, timestamp: new Date() })
    try {
        await logEntry.save();
        console.log('Log entry saved!');
        let date = new Date();
        const logData = `\n{\n date=${date} \n method = ${method} \n url = ${url} \n headers = ${JSON.stringify(headers)}\n} \n`;
        fs.appendFile('log.txt', logData, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    } catch (err) {
        fs.appendFile('log.err.txt', err, err => {
            if (err) {
                console.error(err);
                return;
            }
        });

    }
    next();
};
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger);


app.get("/", (req, res) => {
    res.send("Server is running");
})
// Middleware


//uploads folder
app.use("/uploads", express.static("./uploads"));
app.use("/storage", express.static("./storage"));
app.use(bodyParser.json());

// app.use(upload.array('profile'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(logRequest);

// Routes
app.use(routes);

// Start server and connectDB
connectDB();

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));