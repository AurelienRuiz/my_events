const mongo = require('mongodb');

class Sorties
{
    constructor(instance)
    {
        this.bdd = instance;
    }
    add(creator, eventId, privacy)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.bdd.collection("sorties").find({eventId: eventId, creator: creator}).toArray((err, data) => {
                if(err)
                    resolve({error: true, message: err})
                if(data.length > 0)
                    resolve({error: true, message: "Vous avez déjà organisé une sortie pour cet événement"})
                else
                {
                    return that.bdd.collection("sorties").insertOne({
                        creator: creator,
                        eventId: eventId,
                        privacy: privacy,
                        invited: []
                    },
                    (err, data) => {
                        if(!err)
                        {
                            resolve(data);
                        }
                        else
                            resolve(insert_err)
                    })
                }
            })
        });
    }
    join(facebookId, sortieId)
    {
        var that = this;
        var id = new mongo.ObjectID(sortieId);
        return new Promise(function(resolve, reject) {
            Promise.all([that.isInvited(facebookId, sortieId), that.isCreator(facebookId, sortieId)])
            .then(response => {
                if(!response[0] && !response[1])
                {
                    that.get(sortieId)
                    .then(infoSotie => {
                        let actualInvited = infoSotie.invited
                        actualInvited.push(facebookId)
                        that.bdd.collection("sorties").updateOne(
                            {_id: id},
                            {
                                $set: {
                                    invited: actualInvited
                                }
                            }
                            , (err) => {
                                if(!err)
                                    resolve({"error": false});
                                else
                                    resolve({"error": true, "details": insert_err.response})
                        })
                    })
                }
                else
                    resolve({error: true, message: "Vous êtes déjà dans une sortie liée à cet événement."})
            })
        });
    }
    leave(facebookId, sortieId)
    {
        var that = this;
        var id = new mongo.ObjectID(sortieId);
        return new Promise(function(resolve, reject) {
            that.isCreator(facebookId, sortieId)
            .then(isCreator => {
                if(isCreator)
                {
                    that.bdd.collection("sorties").remove({_id: id}, (err) => {
                        if(!err)
                            resolve({error: false, message: "Sortie deleted"})
                        else
                            resolve({error: true, message: err})
                    })
                }
                else
                {
                    that.isInvited(facebookId, sortieId)
                    .then(isInvited => {
                        if(isInvited)
                        {
                            that.bdd.collection("sorties").updateOne(
                                {_id: id},
                                {
                                    $pull: {invited: facebookId}
                                }
                                , (err) => {
                                    if(!err)
                                        resolve({"error": false});
                                    else
                                        resolve({"error": true, "details": insert_err.response})
                            })
                        }
                        else
                        {
                            resolve({"error": true, "message": "You can't leave a event where you didn't from"})
                        }
                    })
                }
            })
        });
    }
    invite(sortieId, creatorId, invitedId)
    {

        var that  = this
        return new Promise((resolve, reject) => {
            that.isCreator(creatorId, sortieId)
            .then(isCreator => {
                if(!isCreator)
                    resolve({error: true, message: "You're not the creator of the sortie"})
                else
                {
                    resolve(that.join(invitedId, sortieId))
                }
            })
        })
    }
    isInvited(facebookId, sortieId)
    {
        var that = this;
        var id = new mongo.ObjectID(sortieId);
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("sorties").find({_id: id, invited: facebookId}).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                {
                    if(data.length > 0)
                        resolve(true)
                    else
                        resolve(false)
                }
            });
        });
    }
    isCreator(facebookId, sortieId)
    {
        var that = this;
        var id = new mongo.ObjectID(sortieId);
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("sorties").find({_id: id, creator: facebookId}).toArray((err, data) => {
                if(err)
                resolve(err);
                else
                {
                    if(data.length > 0)
                        resolve(true)
                    else
                        resolve(false)
                }
            });
        });
    }
    getByEvent(eventId, privacy)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("sorties").find({eventId: eventId, privacy: privacy}).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                    resolve(data);
            });
        });
    }
    getByUser(facebookId)
    {
        
        var that = this
        return new Promise((resolve, reject) => {
            that.bdd.collection("sorties").find({creator: facebookId}).toArray((err, creatorData) => {
                that.bdd.collection("sorties").find({invited: facebookId}).toArray((err, invitedData) => {
                    resolve({created: creatorData, invited: invitedData})
                })
            })
        });
    }
    get(id)
    {
        var that = this;
        var id = new mongo.ObjectID(id);
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("sorties").find(id).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                    resolve(data[0]);
            });
        });
    }
}

module.exports = Sorties