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
    username: {type: String, required: true},
    isGroup: {type: Boolean, required: true}
});

var Request = mongoose.model('Request', RequestSchema);
//mongoimport --db finaldb --collection requests --file C:\Users\gravadorre_sd2053\Desktop\FInal\bigdata\backend\models\pnrequestdb.json
module.exports = Request;