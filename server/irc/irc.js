module.exports = (io, conversation, member) => {
    io.on("connection", (socket) => {
        console.log("Socket server connected !")
        socket.on("message", (sortieId, message, facebookId) => {
            conversation.newMessage(sortieId, facebookId, message)
            .then(response => {
                conversation.get(sortieId)
                .then(messages => {
                    let allMessages = messages[0].messages
                    let allPictures = allMessages.map(message => {
                        return new Promise((resolve, reject) => {
                            member.get(message.facebookId)
                            .then(result => {
                                resolve(result[0].picture)
                            })
                        })
                    })
                    Promise.all(allPictures)
                    .then(res => {
                        let final = []
                        for(let i = 0; i < allMessages.length; i++)
                        {
                            final.push({
                                content: allMessages[i].content,
                                picture: res[i],
                                facebookId: allMessages[i].facebookId
                            })
                        }
                        io.to(sortieId).emit("newMessage", final)
                    })
                })
            })
        })

        socket.on("new", sortieId => {
            conversation.add(sortieId)
        })

        socket.on("getMessages", (sortieId) => {
            socket.join(sortieId)
            conversation.get(sortieId)
            .then(messages => {
                let allMessages = messages[0].messages
                let allPictures = allMessages.map(message => {
                    return new Promise((resolve, reject) => {
                        member.get(message.facebookId)
                        .then(result => {
                            resolve(result[0].picture)
                        })
                    })
                })
                Promise.all(allPictures)
                .then(res => {
                    let final = []
                    for(let i = 0; i < allMessages.length; i++)
                    {
                        final.push({
                            content: allMessages[i].content,
                            picture: res[i],
                            facebookId: allMessages[i].facebookId
                        })
                    }
                    io.to(sortieId).emit("newMessage", final)
                })
            })
        })
    })
}