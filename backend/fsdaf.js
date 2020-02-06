var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 2, 3, 4, 5, 6, 7];
rule.hour = 11; //testing is here
rule.minute = 45; // testing is here

var job = schedule.scheduleJob(rule, function () {
var today = new Date();
books.forEach(element => { // loop the database
let rdate = new Date(element.dateReturn).toLocaleString().split(",")[0]
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