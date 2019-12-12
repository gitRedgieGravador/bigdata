const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/register", function(req, res) {
  var user = new User(req.body);
  user.password = bcrypt.hashSync(user.password, saltRounds);
  user.save(function(err, resp) {
    if (err) {
      return res.send("error on saving!!");
    } else {
      var acc_token = jwt.sign({ resp }, "token1234", { expiresIn: "12h" });
        return res.send({
          status: true,
          auth: true,
          user: resp,
          token: acc_token,
          sms: "success"
        });
    }
  });
});

router.post("/getuser", function(req, res) {
  let usernamei = req.body.username;
  User.findOne({ username: usernamei }, function(err, data) {
    if (err) {
      return res.send(err);
    }
    if (data == null) {
      return res.send({ sms: "Username Not Found", user: data });
    } else {
      return res.send({ sms: "Success", user: data });
    }
  });
});

router.delete("/deleteuser", function(req, res) {
  User.remove({}, function(err, resp) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(resp);
    }
  });
});

router.post("/login", function(req, res) {
  var usernamei = req.body.username;
  var passwordi = req.body.password;
  User.findOne({ username: usernamei }, function(err, data) {
    if (err) {
      return res.send(err);
    }
    if (data != null) {
      var match = bcrypt.compareSync(passwordi, data.password);
      if (match) {
        var acc_token = jwt.sign({ data }, "token1234", { expiresIn: "12h" });
        return res.send({
          status: true,
          auth: true,
          user: data,
          token: acc_token,
          sms: "success"
        });
      } else {
        return res.send({
          status: false,
          auth: false,
          sms: "Incorrect Password!!",
          token: null,
          user: { isEducator: false }
        });
      }
    }
    return res.send({
      status: false,
      auth: false,
      user: { isEducator: false },
      sms: "Username Not Found!!"
    });
  });
});

router.put("/changepass/:id", (req, res) => {
  console.log("been here :");
  let userId = req.params.id;
  var oldpassword = req.body.oldpassword;
  var newpassword = req.body.newpassword;
  var confirmpassword = req.body.confirmpassword;
  User.findOne({ _id: userId })
    .then(dbres => {
      console.log("test 1")
      var verifylast = bcrypt.compareSync(oldpassword, dbres.password)
      if(verifylast){
        console.log("test 2")
        if(newpassword == confirmpassword){
          console.log("test 3")
          let newpasswordi = bcrypt.hashSync(newpassword, saltRounds);
          let new_data = {password: newpasswordi}
          let idUser = dbres._id
          console.log("id: ",idUser)
          console.log("new_data: ",new_data)
          User.findByIdAndUpdate(idUser, new_data, (err, change)=>{
            if (err){
              console.log("test 4")
              res.send({
                status: false,
                info: null,
                sms: "Update Faild due to network error"
              });
            }else{
              console.log("test 5")
              res.send({
                status: true,
                info: change,
                sms: "Updated Successfully"
              });
            }
          })
        }else{
          console.log("test 6")
          res.send({
            status: false,
            info: null,
            sms: "New password and Comfirm password did not match"
          });
        }
      }else{
        console.log("test 7")
        res.send({
          status: false,
          info: null,
          sms: "Old password is incorrect"
        });
      }
      
    }).catch(err => {
      res.send({
        status: false,
        info: null,
        sms: "Not Found"
      });
    });
});


router.post("/socket", (req, res) => {});

module.exports = router;
