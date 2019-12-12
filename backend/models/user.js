const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    batch: { type: String, required: true },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isEducator: {
        type: Boolean,
        required: true,
        default: false
    }
});

var User = mongoose.model('User', UserSchema);
// var def = new User({ username: "student", password: "student", isEducator: false })
// def.save()
//{ username: this.username, password: this.password, isEducator: false }
module.exports = User;