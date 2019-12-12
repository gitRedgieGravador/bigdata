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
  let name = req.body.firstname + " " + req.body.lastname
  let due = req.body.when
  let item = req.body.what
  sender.sendEmail(name, due,item).then(resp => {
    Request.countDocuments({ status: "unread" }).then(resp => {
      io.emit('countEvent', {status: "unread", count: resp});
    })
  }).catch(err => {
    console.log(err)
  })
  user.save((err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Successfully Saved", data });
  });
});

router.get("/request/:username", (req, res)=>{
  let usernamei = req.params.username;
  Request.find({username:usernamei}).sort({dateOfSubmit: 1}).then(response=>{
    res.send({ message: "Successfully Retrieved!!", dbresponse: response });
  }).catch(err=>{
    res.send(err);
  })
})

router.get("/getAllRequest", (req, res) => {
  Request.find(
    {
      status: {
        $ne: "approved"
      }
    },
    (err, data) => {
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
  var io = req.app.get('socketio');
  Request.findByIdAndUpdate(req.params.id, {
    status: req.body.data
  }, (err, data) => {
    if (err) return res.send(err);
    Request.countDocuments({ status: "unread" }).then(resp => {
      io.emit('countEvent', {status: "unread", count: resp});
    })
    Request.countDocuments({ status: "pending" }).then(resp => {
      io.emit('countEvent', {status: "pending", count: resp});
    })
    Request.countDocuments({ status: "rejected" }).then(resp => {
      io.emit('countEvent', {status: "rejected", count: resp});
    })
    Request.countDocuments({ status: "approved" }).then(resp => {
      io.emit('countEvent', {status: "approved", count: resp});
    })
    return res.send({
      message: "Successfully updated!",
      data
    })
  })
})

router.put('/updateWhy/:id', (req, res) => {
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
router.get("/numApproved", (req, res) => {
  Request.countDocuments({ status: "approved" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

//number of requests approved
router.get("/numPending", (req, res) => {
  Request.countDocuments({ status: "pending" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

//number of requests unread
router.get("/numUnread", (req, res) => {
  Request.countDocuments({ status: "unread" }, (err, data) => {
    if (err) return res.send(err);
    return res.send({ message: "Success", data });
  });
});

//number of request per category
const Most = require("../models/most");
const Tempmost = require('../models/tempmost')
const mongoose = require('mongoose')
// router.post('/cutoff', (req, res) => {
//   let firstDay = req.body.firstDay;
//   let lastDay = req.body.lastDay;
//   helper.addMost(firstDay, lastDay).then(resp => {
//     Tempmost.deleteMany({}).then(rev => {
//       console.log(rev)
//     })
//     res.send(resp)
//   }).catch(err => {
//     Tempmost.deleteMany({}).then(rev => {
//       console.log(rev)
//     })
//     res.send(err)
//   })
// })


const helper = require('../controller/mostFrequent')
// router.get("/mostRequest", (req, res) => {
//   Most.find({}, (err, docs) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send({ dbres: docs })
//     }
//   });
// });

// router.get('/stamp', (req, res) => {
//   Request.find({ status: "approved" }).then(resp => {
//     let datai = resp
//     var tempStamp = []
//     datai.forEach(each => {
//       let starti = new Date(each.dateOfSubmit).toISOString();
//       let endi = new Date(each.statusDate).toISOString();
//       let days = calculateDays(starti, endi)
//       var kani = {
//         batch: each.batch,
//         category: each.category,
//         firstname: each.firstname,
//         lastname: each.lastname,
//         email: each.email,
//         what: each.what,
//         when: each.when,
//         why: each.why,
//         status: each.status,
//         statusDate: each.statusDate,
//         dateOfSubmit: each.dateOfSubmit,
//         duration: days
//       }
//       tempStamp.push(kani)
//     })
//     res.send({ stamp: tempStamp })
//   }).catch(err => {
//     res.send({ err: err })
//   })
// })

var moment = require("moment");
function calculateDays(startDate, endDate) {
  var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
  var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
  var duration = moment.duration(end_date.diff(start_date));
  var days = duration.asDays();
  return days;
}
module.exports = router;
