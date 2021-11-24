const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('placeholder');
const msg = {
  to: 'yugnar@outlook.com',
  from: 'A01339605@tec.mx',
  subject: 'SendGrid test Number 1',
  text: 'Test of text field, we will also include some <p>html tags here just like a good old <br> linebreak ooo yeah </p>',
  html: 'Also testing the html tag, with more html tags: <strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })