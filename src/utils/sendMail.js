const hbs = require('nodemailer-express-handlebars');
const showCounts = require('./show/counts');
const nodemailer = require('nodemailer');
const path = require('path');

async function sendMail({ title = '', content = '', subject = '', error = '', showCounter = true } = {}) {
  console.log('---- ---- --------- ---- ----');
  console.log('---- ---- Send Mail ---- ----');
  console.log('---- ---- --------- ---- ----');

  const { countUsers, countUsersHaveInfo, countUsersDontHaveInfo, countEmails } = await showCounts();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_MAIL,
      pass: process.env.PASS_MAIL
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './src/views',
      defaultLayout: false
    },
    viewPath: './src/views',
    extName: '.handlebars'
  };

  transporter.use('compile', hbs(handlebarsOptions));

  const mailOPtions = {
    from: process.env.FROM_MAIL,
    to: process.env.TO_MAIL,
    subject: subject || 'Spider Notification',
    template: 'email',
    context: { countUsers, countUsersHaveInfo, countUsersDontHaveInfo, error, content, title, showCounter, countEmails }
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
