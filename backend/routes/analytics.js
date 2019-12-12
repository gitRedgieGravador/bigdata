const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Request = require("../models/request");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const sender = require("../email");
const helper =  require('../controller/mostFrequent')
const Tempmost = require("../models/tempmost");
const Most = require("../models/most");

router.get("/mostly2", (req, res) => {
  Most.find({}).sort({"cutOff":-1}).then(resp=>{
    res.send(resp)
  }).catch(err=>{
    res.send(err)
  })
});

router.post('/cutoff', (req, res) => {
  let firstDay = req.body.firstDay;
  let lastDay = req.body.lastDay;
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

router.get("/stamp", (req, res) => {
  Request.find({ status: "approved" })
    .then(resp => {
      let datai = resp;
      var tempStamp = [];
      datai.forEach(each => {
        let starti = new Date(each.dateOfSubmit).toISOString();
        let endi = new Date(each.statusDate).toISOString();
        let days = calculateDays(starti, endi);
        var kani = {
          batch: each.batch,
          category: each.category,
          // firstname: each.firstname,
          // lastname: each.lastname,
          // email: each.email,
          // what: each.what,
          // when: each.when,
          // why: each.why,
          // status: each.status,
          // statusDate: each.statusDate,
          // dateOfSubmit: each.dateOfSubmit,
          duration: days
        };
        tempStamp.push(kani);
      });
      res.send({ stamp: tempStamp });
    })
    .catch(err => {
      res.send({ err: err });
    });
});

var moment = require("moment");
function calculateDays(startDate, endDate) {
  var start_date = moment(startDate, "YYYY-MM-DD HH:mm:ss");
  var end_date = moment(endDate, "YYYY-MM-DD HH:mm:ss");
  var duration = moment.duration(end_date.diff(start_date));
  var days = duration.asDays();
  return days;
}
module.exports = router;
