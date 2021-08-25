const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const { response } = require('express')
users.use(cors())

process.env.SECRET_KEY = 'secret'

// http://localhost:5000/users/register     // and select post method
// You can use above url in advanced rest client to check "/register" api
users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
   if (err) return res.status(500).send('Error on the server.');
   if (!user) return res.status(404).send('No user found.');
   
   // check if the password is valid
   var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
   // if write below code then we will get respose in browser inspect section
   if (!passwordIsValid) return res.status(401).send({ authentication: false, token: null });


  // if we write below line then on Visual studio code terminal we will get the info( "password did not match" )
  // CODE ----
  // if (!passwordIsValid) return console.log("password did not match");
   const payload = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
              }
   // if user is found and password is valid
   // create a token
   // The secrey key always available in the server side
   var token = jwt.sign( payload , process.env.SECRET_KEY, {
    expiresIn: 86400 // expires in 24 hours
   });
 
   // return the information including token as JSON
   res.send(token );
  });
 
 });

users.get('/profile',verifyToken, (req, res) => {
  // You need to verify and parse, the passed token with jwt methods and then find the user by id extracted from the token:
  var decoded = jwt.verify(authorization, process.env.SECRET_KEY)
  //console.log(decoded._id);
  //console.log(decoded.email);
  var userId = decoded._id;
  // Fetch the user by using id 
  User.findOne({
    _id: userId
  }).then(response => {
    // check if we got the response
    //console.log(response);
      if(response) {
        res.json(response) // here we got the users data or requested data for frontend use
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// FORMAT OF TOKEN
// authorization: bearer <access_token>

//verify Token
function verifyToken(req, res, next) {
  // Get authorization header value OR We can say getting token from authorization header
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      authorization = bearerToken;
      // next middleware
      next();
  } else {
      // Forbidden 
      res.sendStatus(403);
  }
}

module.exports = users