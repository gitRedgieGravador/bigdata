const express = require('express')
const app = express()
const port = 3436
const bodyParser = require('body-parser')
const sender = require("../BackEnd/email");
var schedule = require('node-schedule')

//
// Requirement for set up the exercise
//
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//
// Let's start the exercise :
// 
// You have a restaurant and you want to manage the menu :
// You need to know which recipes you can sold and which ingredients you need to use,
// you also need to know what is the purchase price of a dish and what is the price you are selling it.
// ------------------------------

let books = [
    { id: 0, fullname: 'Jessa Mae', email: "jessamae@gmail.com", bookTitle: "Algebra", bookNumber: 123, bookItems: 1, dateBorrow: "1/20/2020", dateReturn: "1/330/20" }, //invalid date
    { id: 1, fullname: 'Jovelyn', email: "jessamae@gmail.com", bookTitle: "Algebra", bookNumber: 123, bookItems: 1, dateBorrow: "1/29/2020", dateReturn: "1/29/2020" }, // change nko then naka send ko
]
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/books', function (req, res) {
    res.json({ data: books })
})
app.post('/books', function (req, res) {
    res.send({ data: books.push(req.body) })
})
app.put('/books/:id', function (req, res) {
    books.forEach(element => {
        if (element.id == req.params.id) {
            element.fullname = req.body.fullname;
            element.email = req.body.email;
            element.bookTitle = req.body.bookTitle;
            element.bookNumber = req.body.bookNumber;
            element.bookItems = req.body.bookItems;
            element.dateBorrow = req.body.dateBorrow;
            element.dateReturn = req.body.dateReturn;
        }
    });
    res.json({ data: books })
})
app.delete('/books/:id', function (req, res) {
    const index = books.findIndex(books=>{
        return books.id == req.params.id
    });  
    res.send(books.splice(index,1))
})

// Sending Email
// sender.sendEmail("jessamaehortadoyosores@gmail.com").then(sent => {
//     console.log("Successfully sent!!");
// }).catch(err => {
//     console.log("Error on sending!!")
// })
// app.post("/daily", (req, res) => { //api linnk
//     console.log("test 1")
//     var today = new Date();
//     books.forEach(element => { // loop the list
//         console.log("date:",today.toLocaleString())
//         if (today.toLocaleString().split(",")[0] === new Date (element.dateReturn).toLocaleString().split(",")[0]) {//1/20/2020

//             console.log("test 2")
//             sender.sendEmail("jessamaehortadoyosores@gmail.com").then(sent => {
//                 console.log("Successfully sentttttt!!");
//             }).catch(err => {
//                 console.log("Error on sending!!")
//             })
//         } else {
//             console.log("not today");
//         }
//     });
// })
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 2, 3, 4, 5, 6, 7];
rule.hour = 13; //testing is here
rule.minute = 13; // testing is here

var job = schedule.scheduleJob(rule, function () {
    console.log("test1")
    var today = new Date();
    books.forEach(element => { // loop the database
        let rdate = new Date(element.dateReturn).toLocaleString().split(",")[0]
        console.log(today.toLocaleString().split(",")[0], " vs ", rdate)
        if (today.toLocaleString().split(",")[0] == rdate) {
            console.log("test1")
            sender.sendEmail("jessamaehortadoyosores@gmail.com").then(sent => { // element.email
                console.log("Successfully sent!!");
            }).catch(err => {
                console.log("Error on sending!!")
            })
        } else {
            console.log("not today");
        }
    });
});