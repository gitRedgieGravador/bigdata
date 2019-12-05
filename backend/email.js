
const SGmail = require("@sendgrid/mail");
//supply the SENDGRID_API_KEY get it iderge32@gmail.com notes
const SENDGRID_API_KEY = "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";
SGmail.setApiKey(SENDGRID_API_KEY); // Input Api key or add to environment config

function sendEmail(sender, duedate, request) {
    return new Promise((resolve, reject) => {
        const message = {
            to: "redgie.gravador@student.passerellesnumeriques.org",
            from: "iderge32@gmail.com",
            subject: "PnRMS New Request",
            text: "Email",
            html: "<div style='border:solid 2px black'>"+
                    "<center>"+
                    "<h1>PN Request Management System</h1><br/><br/>"+
                    "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0PJyNGCV-JAKUUGRUGKCHXQUSi3aaviu-YmV75uMk_9h1coO&s'>"+
                    `<h4>Specific: ${request}</h4>`+
                    `<h4>Sent by: ${sender}</h4>`+
                    `<h4>Needed at: ${duedate}</h4>`+
                    `<h5>Visit PnRMS for more details</h5>`+
                    "</center>"+
                "</div>"
        };
        SGmail.send(message)
            .then(sent => {
                resolve(sent);
            })
            .catch(err => {
                reject(err);
            });
    });
}
module.exports = {
    sendEmail
};
