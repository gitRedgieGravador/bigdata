// var Request = require("../models/request");
// var Most = require("../models/most");
// function findMost(firstDay, lastDay) {
//   return new Promise((resolve, reject) => {
//     Request.aggregate([
//       {
//         $match: {
//           statusDate: {
//             $gt: firstDay,
//             $lt: lastDay
//           }
//         }
//       },
//       { $sortByCount: "$category" }
//     ])
//       .then(resp => {
//         Request.find({ category: resp[0]._id })
//           .then(resp => {
//             var tempArray = [];
//             resp.forEach(category => {
//               tempArray.push(category._id);
//             });
//             try {
//               var most = new Most({
//                 category: resp[0]._id,
//                 cutOff: lastDay,
//                 itemIds: tempArray
//               });
//               most
//                 .save()
//                 .then(savemost => {
//                   resolve(savemost);
//                   //res.send(savemost)
//                 })
//                 .catch(err => {
//                   reject(err);
//                   //res.send(err)
//                 });
//             } catch (err) {
//               //res.send(err)
//             }
//           })
//           .catch(err => {
//             res.send(err);
//           });
//       })
//       .catch(err => {
//         res.send(err);
//       });
//   });
// }

// function getRequest(id) {
//   var data = null;
//   Request.findById(id).then(resp => {
//     data = resp
//   });
//   return data
// }

// module.exports = {
//   findMost,
//   getRequest
// };
