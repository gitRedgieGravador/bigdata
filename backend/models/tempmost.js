const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const TempMostSchema = new Schema({
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

var Tempmost = mongoose.model('Tempmost', TempMostSchema);
//mongoimport --db pnrequestdb --collection requests --file D:\final\bigdata\backend\models\pnrequestdb.json
module.exports = Tempmost;