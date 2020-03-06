const MongoClient = require('mongodb').MongoClient;

class Database {
    constructor(user, password) {
        this.url = `mongodb+srv://${user}:${password}@myevents-u40uf.gcp.mongodb.net/test?retryWrites=true&w=majority`
        this.mongo = new MongoClient(this.url, { useUnifiedTopology: true })
        this.client = null
    }

    destructor() {
        this.mongo.close()
    }

    connect(cb) {
        this.mongo.connect((err, client) => {
            if (err)
                cb('Cannot connect to db')
            this.client = client
            cb(null, this.client.db("myEvents"))
        })
    }
}

module.exports = Database