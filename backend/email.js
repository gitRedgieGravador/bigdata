const SGmail = require("@sendgrid/mail");
//supply the SENDGRID_API_KEY get it iderge32@gmail.com notes
const SENDGRID_API_KEY = "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";
SGmail.setApiKey(SENDGRID_API_KEY); // Input Api key or add to environment config

function sendEmail(email, body) {
  return new Promise((resolve, reject) => {
    const message = {
      to: email,
      from: "iderge32@gmail.com",
      subject: "PnRMS New Request",
      text:"Email",
    html: `<center><h1>PN Request Management System<h1/><p>Title: ${body.title}<p/><p>Need: ${body.date}<br/>For more details visit PnRMS<p/><center/>`
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
