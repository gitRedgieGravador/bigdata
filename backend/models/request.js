const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    batch: {type: Number, required: true},
    category: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    what: {type: String, required: true},
    when: {type: String, required: true},
    why: {type: String, required: true},
    status: {type: String, required: true},
    statusDate: {type: String, required: true},
    dateOfSubmit: {type: String, required: true},
});

var Request = mongoose.model('Request', RequestSchema);
//mongoimport --db pnrequestdb --collection requests --file mongoimport --db pnrequestdb --collection requests --file C:\Users\gravadorre_sd2023\Desktop\Development\bigdata\backend\models\pnrequestdb.json
module.exports = Request;