const express = require('express');
const app = express();
const userRoute = require('./routes/user')
const requestRoute =  require('./routes/request')
var connect = require('./setup')
var cors = require('cors')

app.use(cors())

app.use(userRoute)
app.use(requestRoute)
var port = 3232
const server = app.listen(port, function() {
    console.log('Api server listening on port:', port);
    connect
});

// var sendMail = require('./email')
// sendMail.sendEmail("redgie.gravador@student.passerellesnumeriques.org", "<h1>Hello this is sent via node<br/>BY:Redgie Gravador</h1>").then(resp=>{
//     console.log("Successfully Sent Email!!")
// }).catch(err=>{
//     console.log(err)
// })
const io = require("socket.io")(server);
app.set('socketio', io);