const express = require('express');
const app = express();
const userRoute = require('./routes/user')
    //var mandrill = require('node-mandrill')('c3d911e4-578e-4933-ab89-97b6de339be9');
var connect = require('./setup')
var cors = require('cors')

app.use(cors())

app.use(userRoute)
var port = 3232
const server = app.listen(port, function() {
    console.log('Api server listening on port:', port);
    //connect
});

const io = require("socket.io")(server);
app.set('socketio', io);