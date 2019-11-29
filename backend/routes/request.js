const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Request = require('../models/request')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const sender = require("../email")

router.post('/addRequest', (req, res) => {
    var user = new Request(req.body)
    // var email = req.body.email
    // let body = {title: req.body.what, date:req.body.when}
    //     sender.sendEmail(email, body).then(resp=>{
    //         console.log(resp)
    //     }).catch(err=>{
    //         //console.log(err)
    //     })
    user.save((err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Successfully Saved", data });
    })
})

router.get('/getRequest', (req, res) => {
    Request.findOne({}, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Success", data })
    })
})

router.post('/updateRequest/:id', (req, res) => {
    Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Successfully updated!", data })
    })
})

router.post('/deleteRequest/:id', (req, res) => {
    Request.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Succescfully deleted", data })
    })
})

//number of requests rejected
router.post('/numRejected', (req, res) => {
    Request.countDocuments({ status: "rejected" }, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Success", data })
    })
})

//number of requests approved
router.post('/numApproved', (req, res) => {
    Request.countDocuments({ status: "approved" }, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Success", data })
    })
})

//number of requests unread
router.post('/numUnread', (req, res) => {
    Request.countDocuments({ status: "unread" }, (err, data) => {
        if (err) return res.send(err);
        return res.send({ message: "Success", data })
    })
})

//number of request per category
const Most = require('../models/most')
router.post('/mostRequest', (req, res) => {
    let lastDay = req.body.lastDay
    let firstDay =  req.body.firstDay
    Request.aggregate([
        // {
        //     "$match": {
        //         "statusDate": {
        //             "$gt": firstDay,
        //             "$lt": lastDay
        //         }
        //     }
        // },
        { "$sortByCount": "$category" }]).then(resp => {
            var categoryi = resp[0]._id
            Request.find({ category: categoryi}).then(resp => {
                var tempArray = []
                resp.forEach(category => {
                    tempArray.push(category._id)
                });
                console.log("test 1");
                try {
                    var most = new Most({ category: categoryi, cutOff: new Date(), itemIds: tempArray })
                    console.log("test 2");
                    most.save().then(savemost => {
                        console.log("test 3");
                        res.send(savemost)
                    }).catch(err => {
                        console.log("test 4");
                        res.send(err)
                    })
                }catch(err){
                    res.send(err)
                }
                
            }).catch(err => {
                    res.send(err)
                })
        }).catch(err => {
            res.send(err)
        })
})

module.exports = router;