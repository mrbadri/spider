const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail({ text = '', subject = '', error = '' } = {}) {
  console.log('---- ---- --------- ---- ----');
  console.log('---- ---- Send Mail ---- ----');
  console.log('---- ---- --------- ---- ----');

  console.log(process.env.to_mail);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.from_mail,
      pass: process.env.pass_mail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOPtions = {
    from: process.env.from_mail,
    to: process.env.to_mail,
    subject: subject || 'We Have Error in spider!',
    text: text || `Please Check the Spider Server. <br/> ERROR: ${error}`,
  };

  transporter.sendMail(mailOPtions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log('---- ---- ------------------------ ---- ----');
      console.log('---- ---- Email Sent Successfully! ---- ----');
      console.log('---- ---- ------------------------ ---- ----');
    }
  });
}

module.exports = sendMail;
