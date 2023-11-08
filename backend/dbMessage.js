const mongo = require('mongoose');

// Define data Schema for Whatsapp

const WhatsappSchema = new mongo.Schema({
    message: String,
    name: String,
    timestamp: String,
    received:Boolean
});


//  modal
const whatsappModel = mongo.model("message", WhatsappSchema)

module.exports = whatsappModel;
