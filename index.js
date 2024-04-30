const express = require("express")
const app = express()

require('dotenv').config()

const cors = require('cors');
const helmet = require('helmet');


app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
    next();
  });

const bookRouter = require('./routes/book.router')

app.use("/locker", bookRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))