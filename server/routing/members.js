module.exports = (app, member) => {
    const axios = require('axios');
    const config = require('./../config')[app.get('env')];

    app.get("/allUsers", (req, res) => {
        member.getAll()
        .then(response => {
            res.send(response)
        })
    })

    app.get("/user/search", (req, res) => {
        member.getByName(req.query.search)
        .then(response => {
            res.send(response)
        })
    })
    
    app.post("/connexion", (req, res) => {
        member.connexion(req.body.facebookId, req.body.name, req.body.email, req.body.picture)
        .then(response => {
            res.send(response);
        })
    });
    
    app.get("/user", (req, res) => {
        member.get(req.query.facebookID)
        .then(result => {
            res.send(result)
        })
    })
    
    app.put("/user/:type", (req, res) => {
        member.update(req.params.type, req.body.data)
        .then(result => {
            res.send(result)
        })
    })
}