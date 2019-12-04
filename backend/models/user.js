const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isEducator: {
        type: Boolean,
        required: true
    },
    batch: {type: String, required: true}
});

var User = mongoose.model('User', UserSchema);
// var def = new User({ username: "student", password: "student", isEducator: false })
// def.save()
//{ username: this.username, password: this.password, isEducator: false }
module.exports = User;