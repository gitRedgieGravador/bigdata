const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MostSchema = new Schema({
    category: {type: String, required: true},
    cutOff: {type: String, required: true, unique: true},
    itemIds: {type: Array, required: true}
});

var Most = mongoose.model('Most', MostSchema);

module.exports = Most;