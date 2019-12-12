var Request = require("../models/request");
var Most = require("../models/most");
var Tempmost = require("../models/tempmost");
var PerGroup = require("../models/pergroup");
async function addMost(firstday, lastday) {
  return new Promise(async (resolve, reject) => {
    await Request.find({
      statusDate: { $gte: firstday, $lt: lastday },
      status: "approved"
    }).then(async docs => {
      console.log("all: ",docs)
      await Tempmost.insertMany(docs)
        .then(async dbrs => {
          await Tempmost.aggregate([{ $sortByCount: "$category" }])
            .then(async category => {
              var myArr = [];
              category.forEach(each => {
                let item = {
                  category: each._id,
                  count: each.count
                };
                myArr.push(item);
              });
              console.log("the quick brown fox")
              let most = new Most({ cutOff: lastday, data: myArr });
              await most
                .save()
                .then(resp => {
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

async function addGroupMost(firstday, lastday) {
  return new Promise(async (resolve, reject) => {
    await Request.find({
      statusDate: { $gte: firstday, $lt: lastday },
      status: "approved",
      isGroup: true
    }).then(async docs => {
      console.log("Group: ",docs)
      await Tempmost.insertMany(docs)
        .then(async dbrs => {
          await Tempmost.aggregate([{ $sortByCount: "$category" }])
            .then(async category => {
              var myArr = [];
              category.forEach(each => {
                
                  let item = {
                    category: each._id,
                    count: each.count
                  };
                  myArr.push(item);
                
                
              });
              console.log("the quick brown fox")
              let most = new PerGroup({ cutOff: lastday, data: myArr, isGroup: true });
              await most
                .save()
                .then(resp => {
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

async function addIndMost(firstday, lastday) {
  return new Promise(async (resolve, reject) => {
    await Request.find({
      statusDate: { $gte: firstday, $lt: lastday },
      status: "approved",
      isGroup: false
    }).then(async docs => {
      console.log("ind: ",docs)
      await Tempmost.insertMany(docs)
        .then(async dbrs => {
          await Tempmost.aggregate([{ $sortByCount: "$category" }])
            .then(async category => {
              var myArr = [];
              category.forEach(each => {
                
                  let item = {
                    category: each._id,
                    count: each.count
                  };
                  myArr.push(item);
                
                
              });
              console.log("the quick brown fox")
              let most = new PerGroup({ cutOff: lastday, data: myArr, isGroup: false });
              await most
                .save()
                .then(resp => {
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

function getRequest(id) {
  var data = null;
  Request.findById(id).then(resp => {
    data = resp;
  });
  return data;
}

module.exports = {
  getRequest,
  addMost,
  addGroupMost,
  addIndMost
};
