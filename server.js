var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000
const isDev = process.env.NODE_ENV !== 'production';


app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const mongoURI = "mongodb://localhost:27017/login_data"

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true,
        useUnifiedTopology: true
     }
  ).then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err))

  
var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})


// In order to run server side program or node server type " npm run dev " in comand prompt
// In order to create client side frontend part in recat, You need to type " create-react-app  client" in terminal
// In order to run client side program or react server type " npm start " in comand prompt

// "proxy": "http://localhost:5000",