class Members
{
    constructor(instance)
    {
        this.bdd = instance;
    }
    connexion(facebookId, name, email, picture)
    {
        var that = this
        return new Promise((resolve, reject) => {    
            this.isMember(facebookId)
            .then(response => {
                if(response.isAlreadyRegister)
                    resolve(response);
                else
                    that.add(facebookId, name, email, picture)
                    .then(addRes => {
                        resolve(addRes);
                    })
            })
        })
    }
    add(facebookId, name, email, picture)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("members").insertOne({
                facebookId: facebookId,
                name: name,
                email: email,
                picture: `https://graph.facebook.com/${facebookId}/picture?width=150`,
                biography: ""
            }, (err) => {
                if(!err)
                {
                    that.facebookId = facebookId
                    resolve({
                        "isAlreadyRegister": false, 
                        "userInfo": {
                            facebookId: facebookId,
                            name: name,
                            email: email,
                            picture: `https://graph.facebook.com/${facebookId}/picture?width=150`,
                            biography: ""
                        }
                    });
                }
                else
                    resolve(insert_err)
            })
        });
    }
    update(type, data)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            if( type == "picture")
                return that.bdd.collection("members").updateOne(
                    {facebookId: that.facebookId},
                    {
                        $set: {
                            picture: data
                        }
                    }
                    , (err) => {
                        if(!err)
                            resolve({"error": false});
                        else
                            resolve({"error": true, "details": insert_err.response})
                })
            else if(type == "biography")
                return that.bdd.collection("members").updateOne(
                    {facebookId: that.facebookId},
                    {
                        $set: {
                            biography: data
                        }
                    }
                    , (err) => {
                        if(!err)
                            resolve({"error": false});
                        else
                            resolve({"error": true, "details": insert_err.response})
                })
        });
    }
    isMember(facebookId)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("members").find({facebookId: facebookId}).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                {
                    if(data.length > 0)
                    {
                        that.facebookId = facebookId
                        resolve({"isAlreadyRegister": true, "userInfo": data});
                    }
                    else
                        resolve({"isAlreadyRegister": false});
                }
            });
        });        
    }
    get(facebookId) {
        return new Promise((resolve, reject) => {
            this.isMember(facebookId)
            .then((response) => {
                if(response.isAlreadyRegister)
                    resolve(response.userInfo)
            })
        })
    }
    getAll()
    {
        var that = this
        return new Promise((resolve, reject) => {
            that.bdd.collection("members").find({}, {id: 1, name: 1, picture: 1}).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                {
                    resolve(data);
                }
            });
        })
    }
    getByName(name)
    {
        var that = this
        var regex = new RegExp(`^${name}`, "i");
        return new Promise((resolve, reject) => {
            that.bdd.collection("members").find({ "name": { $regex: regex } }).toArray((err, data) => {
                if(err)
                    resolve(err);
                else
                {
                    resolve(data);
                }
            });
        })
    }
}

module.exports = Members