const express = require("express");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http)
const cors = require("cors");
const config = require('./config')[app.get('env')];
const Database = require("./database/bdd.js");
const Members = require("./database/Members.js");
const Sorties = require("./database/Sorties.js");
const Conversations = require("./database/Conversations.js");
var adminInfo = config.database["alexis"];
var bdd = new Database(adminInfo.login, adminInfo.password);
var member = null;
var sortie = null;
var conversation = null;
bdd.connect((err, client) => {
    if(err)
        console.log("error")
    app.listen(config.port, _ => {
        console.log(`Server started on port : http://${config.host}:${config.port}`)
    })
    http.listen(config.socket.port, _ => {
        console.log(`Server socket started on port : http://${config.host}:${config.socket.port}`)
    })
    member = new Members(client);
    sortie = new Sorties(client);
    conversation = new Conversations(client);
    require("./routing/events")(app)
    require("./routing/sorties")(app, member, sortie)
    require("./routing/members")(app, member)
    require("./irc/irc")(io, conversation, member)
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});