const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Server Port
const port = process.env.port || 3000;
const authRoute =require('./routes/auth-route');
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoute);

app.get('/', (req, res) =>{
    res.send("Welcome to Server");
})

app.listen(port, () =>{
    console.log("Server connected at port: ", port);
})
