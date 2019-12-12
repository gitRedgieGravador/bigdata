const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MostSchema = new Schema({
    cutOff: {type: String, required: true},
    data: {type: Array, required: true},
    isGroup:{type:Boolean, required: true}
});

var PerGroup = mongoose.model('PerGroup', MostSchema);

module.exports = PerGroup;