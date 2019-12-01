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
      console.log(data);

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
router.post("/mostRequest", (req, res) => {
  let lastDay = req.body.lastDay;
  let firstDay = req.body.firstDay;
  Request.aggregate([
    // {
    //     "$match": {
    //         "statusDate": {
    //             "$gt": firstDay,
    //             "$lt": lastDay
    //         }
    //     }
    // },

    { $sortByCount: "$category" }
  ])
    .then(resp => {
      var categoryi = resp[0]._id;
      Request.find({ category: categoryi })
        .then(resp => {
          var tempArray = [];
          resp.forEach(category => {
            tempArray.push(category._id);
          });
          try {
            var date = new Date();
            var datei = date.getMonth() - 2 + " " + date.getFullYear();
            var most = new Most({
              category: categoryi,
              cutOff: datei,
              itemIds: tempArray
            });
            most
              .save()
              .then(savemost => {
                res.send({ dbres: savemost });
              })
              .catch(err => {
                res.send(err);
              });
          } catch (err) {
            res.send(err);
          }
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });
});

const helper = require('../controller/mostFrequent')
router.get("/mostRequest", (req, res) => {
  Most.find({}, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      //handle response
    }
  });
});
module.exports = router;
