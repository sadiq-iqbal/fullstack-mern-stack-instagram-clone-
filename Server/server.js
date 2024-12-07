const express = require('express');
const app = express();
const CONNECT = require("./utils/dbConnect");
const logger = require('./middleware/logger');
const authRouter = require('./routes/authRoutes');
const errorWare = require('./middleware/errorWare');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRoute.js');
const cors = require('cors');
// const commentRouter = require('./routes/commentRoute.js');
const userRouter = require('./routes/userRoute.js');
app.use(cookieParser());

app.use(logger);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// console.log(process.env.ATSK);
app.use('/', authRouter);
// app.use('/api/comments', commentRouter);
app.use('/api', postRouter);
app.use('/api', userRouter);

app.use(errorWare);
// custom function that connects to both the database and the server
CONNECT(app);