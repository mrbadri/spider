const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail({ text = '', subject = '', error = '' } = {}) {
  console.log('---- ---- --------- ---- ----');
  console.log('---- ---- Send Mail ---- ----');
  console.log('---- ---- --------- ---- ----');

  console.log(process.env.TO_MAIL);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_MAIL,
      pass: process.env.PASS_MAIL,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOPtions = {
    from: process.env.FROM_MAIL,
    to: process.env.TO_MAIL,
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
