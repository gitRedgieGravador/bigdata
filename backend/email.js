const SGmail = require("@sendgrid/mail");
const SENDGRID_API_KEY =
  "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";
SGmail.setApiKey(SENDGRID_API_KEY); // Input Api key or add to environment config

function sendEmail(email, body) {
  return new Promise((resolve, reject) => {
    const message = {
      to: email,
      from: "iderge32@gmail.com",
      subject: "PN Request Management",
      text:"Email",
      html: body
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
