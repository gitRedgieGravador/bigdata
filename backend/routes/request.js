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
  // let body = {title: req.body.what, date:req.body.when}
  //     sender.sendEmail(email, body).then(resp=>{
  //         console.log(resp)
  //     }).catch(err=>{
  //         //console.log(err)
  //     })
  user.save((err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Successfully Saved", data });
  });
});
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
router.get("/getRequest", (req, res) => {
  Request.findOne({}, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

router.post("/updateRequest/:id", (req, res) => {
  Request.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    (err, data) => {
      if (err) return res.send(err);
      return res.send({ message: "Successfully updated!", data });
    }
  );
});

router.post("/deleteRequest/:id", (req, res) => {
  Request.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Succescfully deleted", data });
  });
});

//number of requests rejected
router.post("/numRejected", (req, res) => {
  Request.countDocuments({ status: "rejected" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

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
  let firstDay = "10/1/2019";
  let lastDay = "10/30/2019";
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
    datai.forEach(each=>{
      let starti = each.dateOfSubmit;
      let endi = each.statusDate;
      let days = calculateDays(starti, endi)
      each["duration"] = days
      console.log("each== ",days)
    })
    res.send({stamp: datai})
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
