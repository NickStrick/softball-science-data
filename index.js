const express = require("express")
const app = express()

require('dotenv').config()

const cors = require('cors');
const helmet = require('helmet');

app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

const bookRouter = require('./routes/book.router')

app.use("/locker", bookRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))