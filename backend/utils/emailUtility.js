const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmailNotif = async (email, url) => {
  const ops = {
    to: email,
    from: "rafaelrojasob@hotmail.com",
    subject: `WARNING!!!! Your site ${url} is down`,
    html: `Your registered site: ${url} went down at ${new Date(Date.now()).toISOString()}`,
  };

  console.log(email, url);
  await sgMail
    .send(ops)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
};