const express = require('express');
const app = express();
const userRoute = require('./routes/user')
const analyticsRoute = require('./routes/analytics')
const requestRoute =  require('./routes/request')
var connect = require('./setup')
var cors = require('cors')

app.use(cors())

app.use(userRoute)
app.use(requestRoute)
app.use(analyticsRoute)
var port = process.env.PORT || 3232
const server = app.listen(port, function() {
    console.log('Api server listening on port:', port);
    connect
});

app.get("/", (req,res)=>{
  res.send("Hello the deployment succeed!!")
})
// var schedule =  require('node-schedule')

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [1,2,3,4,5,6,7];
// rule.hour = 11;
// rule.minute = 19;

// var job = schedule.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
// });

// var sendMail = require('./email')
// sendMail.sendEmail("redgie.gravador@student.passerellesnumeriques.org").then(resp=>{
//     console.log("Successfully Sent Email!!")
// }).catch(err=>{
//     console.log(err)
// })
const io = require("socket.io")(server);
app.set('socketio', io);