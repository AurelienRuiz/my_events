
module.exports = (app, member, sortie) => {
    const axios = require('axios');
    const config = require('./../config')[app.get('env')];
    
    app.post("/event", (req, res) => {
        sortie.add(req.query.facebookId, req.query.eventId, req.query.privacy)
        .then(result => {
            res.send(result)
        })
    })
    
    app.post("/invite", (req, res) => {
        sortie.invite(req.query.sortieId, req.query.facebookId, req.query.invited)
        .then(result => {
            res.send(result)
        })
    })
    
    app.get("/sortie", (req, res) => {
        sortie.get(req.query.sortieID)
        .then(response => {
            member.get(response.creator)
            .then(infoCreator => {
                response.creator = {
                    id: infoCreator[0].facebookId,
                    name: infoCreator[0].name,
                    picture: infoCreator[0].picture
                }
                let invitedInfos = response.invited.map(inivitedID => {
                    return new Promise((resolve, rejected) => {
                        member.get(inivitedID)
                        .then(invitedInfo => {
                            resolve({
                                id: invitedInfo[0].facebookId,
                                name: invitedInfo[0].name,
                                picture: invitedInfo[0].picture
                            })
                        })
                    })
                })
                Promise.all(invitedInfos)
                .then(allInvitedInfos => {
                    response.invited = allInvitedInfos
                    axios.get(`${config.api.eventful.host}events/get?${config.api.eventful.key}&id=${response.eventId}`)
                    .then(evResp => {
                        response.event = evResp.data
                        res.send(response)
                    })
                })
            })
        })
    })
    
    app.post("/join", (req, res) => {
        sortie.join(req.query.facebookID, req.query.sortieID)
        .then(result => {
            res.send(result)
        })
    })
    
    app.put("/leave", (req, res) => {
        sortie.leave(req.query.facebookID, req.query.sortieID)
        .then(result => {
            res.send(result)
        })
    })
    
    app.get("/event", (req, res) => {
        axios.get(`${config.api.eventful.host}events/get?${config.api.eventful.key}&id=${req.query.id}`)
        .then(response => {
            sortie.getByEvent(response.data.id, "public")
            .then((sorties) => {
                let detailsSorties = sorties.map(sortieEv => {
                    return new Promise((resolve, reject) => {
                        member.get(sortieEv.creator)
                        .then(infosMember => {
                            sortieEv.creator = {
                                id: infosMember[0].facebookId,
                                name: infosMember[0].name,
                                picture: infosMember[0].picture
                            }
                            resolve(sortieEv)
                        })
                    })
                })
                Promise.all(detailsSorties)
                .then(infoSorties => {
                    response.data.sorties = infoSorties
                    res.json(response.data)
                })
            })
        })
    })

    app.get("/mySorties", (req, res) => {
        sortie.getByUser(req.query.facebookId)
        .then(response => {
            let infoEventCreated = response.created.map((event) => {
                return new Promise((resolve, reject) => {
                    axios.get(`${config.api.eventful.host}events/get?${config.api.eventful.key}&id=${event.eventId}`)
                    .then(evResp => {
                        resolve({title: evResp.data.title})
                    })
                })
            })
            Promise.all(infoEventCreated)
            .then((infoEventCreatedResponse) => {
                for(let i = 0; i < response.created.length; i++) {
                    response.created[i].event = infoEventCreatedResponse[i]
                }
                let infoEventInvited = response.invited.map((event) => {
                    return new Promise((resolve, reject) => {
                        axios.get(`${config.api.eventful.host}events/get?${config.api.eventful.key}&id=${event.eventId}`)
                        .then(evResp => {
                            resolve({title: evResp.data.title})
                        })
                    })
                })
                Promise.all(infoEventInvited)
                .then((infoEventInvitedResponse) => {
                    for(let i = 0; i < response.invited.length; i++) {
                        response.invited[i].event = infoEventInvitedResponse[i]
                    }
                    res.send(response)
                })
            })
        })
    })
}