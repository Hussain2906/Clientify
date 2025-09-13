require('dotenv').config();

const express = require('express');
const app = express();
const connectDb = require('./db/db');

//middlewares here

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// configs 
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// using middlewares here

app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors
    ({
        origin: CORS_ORIGIN,
        credentials: true,
    })
)

// test routes here
app.get('/health', (req, res) => {
    res.json({
        status: 200,
        ok: true,
        service: "Backend is running",
        time: new Date().toISOString(),
    })
})

// Connection to DB
connectDb();

// server start
app.listen(PORT, () => {
    console.log(`backend running on http://localhost:${PORT}`);
});