const express = require("express");
const axios = require('axios');
const app = express();
const config = require('./config')[app.get('env')];

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/home", (req, res) => {
    axios.get(`${config.api.eventful.host}events/search?app_key=${config.api.eventful.key}&location=Nantes,France`)
    .then(response => {
        res.json(response.data);
    })
});

app.listen(config.port, _ => {
    console.log(`Server started on port : ${config.port}`)
})