const express = require("express")
const app = express()

require('dotenv').config()

const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');


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

async function sendEmail(subject, message) {
  const data = JSON.stringify({
    "Messages": [{
      "From": {"Email": "strickerbro@gmail", "Name": "Porfolio Site"},
      "To": [{"Email": "strickerbro@gmail", "Name": "Nick Stricker"}],
      "Subject": subject,
      "TextPart": message
    }]
  });

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: {'Content-Type': 'application/json'},
    auth: {username: '68adf2ba533ef188c81c6c6567b9fc8d', password: '4de072936905bfd10853fc921a37127a'},
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

}

// define your own email api which points to your server.
app.post('/api/sendemail/', function (req, res) {
  const {name, email, message} = req.body;
  //implement your spam protection or checks.
  sendEmail(name + " - " + email, message);
});

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))