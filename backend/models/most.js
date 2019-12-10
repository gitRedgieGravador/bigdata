const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MostSchema = new Schema({
    cutOff: {type: String, required: true, unique: true},
    data: {type: Array, required: true}
});

var Most = mongoose.model('Most', MostSchema);

module.exports = Most;