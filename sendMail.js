const hbs = require('nodemailer-express-handlebars');
const showCounts = require('./src/utils/show/counts');
const nodemailer = require('nodemailer');
const path = require('path');

async function sendMail({ text = '', subject = '', error = '' } = {}) {
  console.log('---- ---- --------- ---- ----');
  console.log('---- ---- Send Mail ---- ----');
  console.log('---- ---- --------- ---- ----');

  const { users, usersHaveInfo, usersDontHaveInfo } = await showCounts();

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

  const handlebarsOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './views',
      defaultLayout: false,
    },
    viewPath: './views',
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarsOptions));

  const mailOPtions = {
    from: process.env.FROM_MAIL,
    to: process.env.TO_MAIL,
    subject: subject || 'We Have Error in spider!',
    template: 'email',
    context: {
      full_name: 'test context',
    },
  };

  transporter.sendMail(mailOPtions, function (err, success) {
    if (err) {
      console.log(err);
      console.log('---- ---- ------------------------ ---- ----');
      console.log('---- ---- -- Email Do not sent! -- ---- ----');
      console.log('---- ---- ------------------------ ---- ----');
    } else {
      console.log('---- ---- ------------------------ ---- ----');
      console.log('---- ---- Email Sent Successfully! ---- ----');
      console.log('---- ---- ------------------------ ---- ----');
    }
  });
}

module.exports = sendMail;
