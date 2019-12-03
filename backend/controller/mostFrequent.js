var Request = require("../models/request");
var Most = require("../models/most");
var Tempmost = require("../models/tempmost");
async function addMost(firstday, lastday) {
    return new Promise(async (resolve, reject) => {
        console.log(firstday, " vs ", lastday)
        await Request.find({ statusDate: { $gte: firstday, $lt: lastday }, status: "approved" }).then(async docs => {
            console.log("docs==,", docs)
            Tempmost.insertMany(docs).then(async dbrs => {
                await Tempmost.aggregate([
                    { $sortByCount: "$category" },
                    { $limit: 1 }
                ])
                    .then(async resp => {
                        var categoryi = resp[0]._id
                        Tempmost.find({ category: categoryi })
                            .then(async resp => {
                                var tempArray = [];
                                resp.forEach(category => {
                                    if (!tempArray.includes(category)) {
                                        tempArray.push(category);
                                    }
                                });
                                try {
                                    var datei = lastday;
                                    var most = new Most({
                                        category: categoryi,
                                        cutOff: datei,
                                        itemIds: tempArray
                                    });
                                    await most
                                        .save()
                                        .then(savemost => {
                                            console.log("Saved!!")
                                            resolve(savemost)
                                        })
                                        .catch(err => {
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
            }).catch(err => {
                reject(err)
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
