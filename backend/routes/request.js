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
  console.log("cutoff-----")
  let lastDay = "11/1/2019";
  let firstDay = "11/30/2019";
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
  // Request.find({when: {$gte: "10/1/2019", $lt: "10/30/2019"}, status:"approved"}).then((docs)=>{
  //   console.log("docs==", docs)
  //   docs.forEach(each =>{
  //     //console.log("each ===", each)
  //     newddata = {
  //       batch: each.batch,
  //       category: each.category,
  //       firstname: each.firstname,
  //       lastname: each.lastname,
  //       email: each.email,
  //       what: each.what,
  //       when: each.when,
  //       why: each.why,
  //       status: each.status,
  //       statusDate: each.statusDate,
  //       dateOfSubmit: each.dateOfSubmit
  //     }
  //     let temp = new Tempmost(newddata)
  //     temp.save()
  //   })
  //   res.send("added!!!")
  // })
})
// router.post('/addtemptomost', (req, res)=>{
//   Tempmost.aggregate([
//     { $sortByCount: "$category" },
//     {$limit: 1}
//   ])
//     .then(resp => {
//       console.log("catid: ==",resp )
//       var categoryi = resp._id
//       Tempmost.find({ category: categoryi })
//         .then(resp => {
//           var tempArray = [];
//           resp.forEach(category => {
//             tempArray.push(category);
//           });
//           try {
//             var date = new Date();
//             var datei = date.getMonth() + " " + date.getFullYear();
//             var most = new Most({
//               category: categoryi,
//               cutOff: datei,
//               itemIds: tempArray
//             });
//             most
//               .save()
//               .then(savemost => {
//                 Tempmost.remove({}).then(rev =>{
//                   console.log("removed!!")
//                 })
//                 res.send({ dbres: savemost });
//               })
//               .catch(err => {
//                 res.send(err);
//               });
//           } catch (err) {
//             res.send(err);
//           }
//         })
//         .catch(err => {
//           res.send(err);
//         });
//     })
//     .catch(err => {
//       res.send(err);
//     });
// })

// router.post("/mostRequest", (req, res) => {
//   let lastDay = req.body.lastDay;
//   let firstDay = req.body.firstDay;
//   console.log("enter here...")
//   Request.aggregate([
//     { $sortByCount: "$category" }
//   ])
//     .then(resp => {
//       var categoryi = resp[0]._id;
//       res.send(resp)
//       Request.find({ category: categoryi })
//         .then(resp => {
//           var tempArray = [];
//           resp.forEach(category => {
//             tempArray.push(category);
//           });
//           try {
//             var date = new Date();
//             var datei = date.getMonth() + " " + date.getFullYear();
//             var most = new Most({
//               category: categoryi,
//               cutOff: datei,
//               itemIds: tempArray
//             });
//             most
//               .save()
//               .then(savemost => {
//                 Tempmost.remove({}).then(rev =>{
//                   console.log("removed!!")
//                 })
//                 res.send({ dbres: savemost });
//               })
//               .catch(err => {
//                 res.send(err);
//               });
//           } catch (err) {
//             res.send(err);
//           }
//         })
//         .catch(err => {
//           res.send(err);
//         });
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });

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
module.exports = router;
