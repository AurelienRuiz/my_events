const express = require("express");
const app = express();
const config = require('./config')[app.get('env')];

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(config.port, _ => {
    console.log(`Server started on port : ${config.port}`)
})