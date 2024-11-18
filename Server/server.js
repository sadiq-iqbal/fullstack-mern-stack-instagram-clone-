const express = require('express');
const app = express();
const CONNECT = require("./utils/dbConnect");
const logger = require('./middleware/logger');
const authRouter = require('./routes/authRoutes');
const errorWare = require('./middleware/errorWare');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRoute.js');
app.use(cookieParser());
app.use(logger);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// console.log(process.env.ATSK);
app.use('/', authRouter);
app.use('/api', postRouter);


app.use(errorWare);
// custom function that connects to both the database and the server
CONNECT(app);