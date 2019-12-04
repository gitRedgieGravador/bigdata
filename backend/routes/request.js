const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Request = require("../models/request");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const sender = require("../email");

router.post("/addRequest", (req, res) => {
  var user = new Request(req.body);
  var email = req.body.email;
  var io = req.app.get('socketio');
  let body = {title: req.body.what, date:req.body.when}
      sender.sendEmail(email, body).then(resp=>{
          //console.log(resp)
          Request.find({status: "unread"}).count().then(resp=>{
            io.emit('newrequest', resp);
          })
      }).catch(err=>{
          //console.log(err)
      })
  user.save((err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Successfully Saved", data });
  });
});

router.get('/unread', (req, res)=>{
  Request.find({status: "unread"}).count().then(resp=>{
    res.send({count: resp})
  }).catch(err=>{
    res.send({err: err})
  })
})

router.get("/getAllRequest", (req, res) => {
  // var request = new Request(req.body)
  Request.find(
    {
      status: {
        $ne: "approved"
      }
    },
    (err, data) => {
      //console.log(data);

      if (err) return res.send(err);
      return res.send({ message: "Successfully Retrieved!!", data });
    }
  );
});

router.get('/getUnread', (req, res) => {
  Request.find({ status: "unread" }).sort({ when: 1 }).exec((err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Success",
          data
      })
  })
})

router.get('/getApproved', (req, res) => {
  Request.find({ status: "approved" }, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Success",
          data
      })
  })
})

router.get('/getPending', (req, res) => {
  Request.find({ status: "pending" }, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Success",
          data
      })
  })
})

router.get('/getRejected', (req, res) => {
  Request.find({ status: "rejected" }, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Success",
          data
      })
  })
})
router.put('/updateRequest/:id', (req, res) => {
  console.log(req.body.data)
  var io = req.app.get('socketio');
  Request.findByIdAndUpdate(req.params.id, {
      status: req.body.data
  }, (err, data) => {
      if (err) return res.send(err);
      Request.find({status: "unread"}).count().then(resp=>{
        io.emit('newrequest', resp);
      })
      return res.send({
          message: "Successfully updated!",
          data
      })
  })
})

router.put('/updateWhy/:id', (req, res) => {
  console.log(req.body.data)
  Request.findByIdAndUpdate(req.params.id, {
      why: req.body.data
  }, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Successfully updated!",
          data
      })
  })
})

router.post('/deleteRequest/:id', (req, res) => {
  Request.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Succescfully deleted",
          data
      })
  })
})

//number of requests rejected
router.get('/numRejected', (req, res) => {
  Request.countDocuments({
      status: "rejected"
  }, (err, data) => {
      if (err) return res.send(err);
      return res.send({
          message: "Success",
          data
      })
  })
})

//number of requests approved
router.post("/numApproved", (req, res) => {
  Request.countDocuments({ status: "approved" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

//number of requests unread
router.post("/numUnread", (req, res) => {
  Request.countDocuments({ status: "unread" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

//number of request per category
const Most = require("../models/most");
const Tempmost = require('../models/tempmost')
const mongoose = require('mongoose')
router.post('/cutoff', (req, res) => {
  let firstDay = "12/1/2019";
  let lastDay = "12/30/2019";
  helper.addMost(firstDay, lastDay).then(resp => {
    Tempmost.deleteMany({}).then(rev => {
      console.log(rev)
    })
    res.send(resp)
  }).catch(err => {
    Tempmost.deleteMany({}).then(rev => {
      console.log(rev)
    })
    res.send(err)
  })
})


const helper = require('../controller/mostFrequent')
router.get("/mostRequest", (req, res) => {
  Most.find({}, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ dbres: docs })
    }
  });
});

router.get('/stamp', (req, res)=>{
  Request.find({status: "approved"}).then(resp=>{
    let datai = resp
    var tempStamp = []
    datai.forEach(each=>{
      console.log("test")
      let starti = new Date(each.dateOfSubmit).toISOString();
      let endi = new Date(each.statusDate).toISOString();
      console.log("test 1")
      let days = calculateDays(starti, endi)
      var kani = {
        batch:each.batch,
        category:each.category,
        firstname:each.firstname,
        lastname:each.lastname,
        email:each.email,
        what:each.what,
        when:each.when,
        why:each.why,
        status:each.status,
        statusDate:each.statusDate,
        dateOfSubmit:each.dateOfSubmit,
        duration: days
      }
      console.log("test 2 ",kani)
      tempStamp.push(kani)
    })
    res.send({stamp: tempStamp})
  }).catch(err=>{
    res.send({err: err})
  })
})
var moment = require("moment");
function calculateDays(startDate,endDate)
{ 
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var days = duration.asDays();       
   return days;
}
module.exports = router;
