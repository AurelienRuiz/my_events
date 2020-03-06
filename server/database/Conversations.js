class Conversations
{
    constructor(instance)
    {
        this.bdd = instance;
    }
    add(sortieId)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            return that.bdd.collection("conversations").insertOne({
                sortieId: sortieId,
                messages: []
            }, (err, data) => {
                if(!err)
                    resolve(data);
                else
                    resolve(insert_err)
            })
        });
    }
    newMessage(sortieId, facebookId, message)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.bdd.collection("conversations").updateOne(
                {sortieId: sortieId},
                {
                    $push: {"messages": {"content": message, "facebookId": facebookId}}
                }
                , (err, data) => {
                    if(!err)
                        resolve({"error": false});
                    else
                        resolve({"error": true, "details": insert_err.response})
            })
        });
    }
    get(sortieId)
    {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.bdd.collection("conversations").find({sortieId: sortieId}).toArray((err, data) => {
                if(err)
                    resolve({error: true, message: err})
                else
                    resolve(data)
            })
        });
    }
}

module.exports = Conversations