var Request = require("../models/request");
var Most = require("../models/most");
var Tempmost = require("../models/tempmost");
async function addMost(firstday, lastday) {
    return new Promise(async (resolve, reject) => {
        await Request.find({ when: { $gte: firstday, $lt: lastday }, status: "approved" }).then(async docs => {
            console.log("docs==", docs)
            var master = []
            await docs.forEach(async each => {
                newddata = {
                    batch: each.batch,
                    category: each.category,
                    firstname: each.firstname,
                    lastname: each.lastname,
                    email: each.email,
                    what: each.what,
                    when: each.when,
                    why: each.why,
                    status: each.status,
                    statusDate: each.statusDate,
                    dateOfSubmit: each.dateOfSubmit
                }
                master.push(newddata)
                let temp = new Tempmost(newddata)
                master.push(temp)
            })
            Tempmost.insertMany(master).then(async dbrs => {
                await Tempmost.aggregate([
                    { $sortByCount: "$category" },
                    { $limit: 1 }
                ])
                    .then(async resp => {
                        console.log("catid: ==", resp)
                        var categoryi = resp[0]._id
                        Tempmost.find({ category: categoryi })
                            .then(async resp => {
                                console.log("resonse == ", resp)
                                console.log("test1")
                                var tempArray = [];
                                resp.forEach(category => {
                                    console.log("test2")
                                    tempArray.push(category);
                                });
                                try {
                                    var date = new Date();
                                    var datei = date.getMonth() + " " + date.getFullYear();
                                    var most = new Most({
                                        category: categoryi,
                                        cutOff: datei,
                                        itemIds: tempArray
                                    });
                                    console.log("test3")
                                    await most
                                        .save()
                                        .then(savemost => {
                                            console.log("test4")
                                            resolve(savemost)
                                        })
                                        .catch(err => {
                                            console.log("test5")
                                            reject(err);
                                        });
                                } catch (err) {
                                    reject(err);
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
        })
    })
}
function getRequest(id) {
    var data = null;
    Request.findById(id).then(resp => {
        data = resp
    });
    return data
}

module.exports = {
    getRequest,
    addMost
};
