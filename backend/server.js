// importing
const express = require('express');
const mongo = require('mongoose');
const whatsappModel = require('./dbMessage')
const Pusher = require('pusher');
const cores = require('cors');
// app config
const app = express();
const port = process.env.PORT || "9000"

const pusher = new Pusher({
    appId: "1462608",
    key: "83243e3fa84c09022523",
    secret: "7de9109dcd81e8076f71",
    cluster: "ap2",
    useTLS: true
});
// middleware
app.use(express.json())
app.use(cores())
// app.use((req, res, next) => {
//     res.setHeader("Access- Control-Allow-origin", "*")
//     res.setHeader("Access- Control-Allow-Headers", "*")
//     next();
// })
// DB config
const connection_url = "mongodb+srv://Subhash:Subhash@cluster1.0dptlxp.mongodb.net/?retryWrites=true&w=majority"

const DB_OPTIONS = {
    dbName: "WhatsappMessageDB",
}
mongo.connect(connection_url, DB_OPTIONS)
    .then(() => {
        console.log("ConnectionSuccessful");
    })
    .catch((err) => {
        console.log(err)
    })

// ....
const db = mongo.connection;
db.once('open', () => {
    console.log("DB is connected!");

    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received:messageDetails.received

            });
        } else {
            console.log("Error Triggering pusher!")
        }
    })
});

// api routes
app.get('/', (req, res) => {
    res.status(200).send("Hii")
})
app.get('/message/sync', (req, res) => {
    whatsappModel.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
app.post('/message/new', (req, res) => {
    const dbMessage = req.body;
    whatsappModel.create(dbMessage, (err, data) => {
        if (err) {
            res.status(404).send(err)
        } else {
            res.status(201).send(`new message created:\n${data}`)
        }
    })

})
// listen
app.listen(port, () => {
    console.log("Server listening!")
})





