const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmailNotif = async (email, url) => {
  const ops = {
    to: email,
    from: "elemailbaaqui",
    subject: `WARNING!!!! ${url} is down`,
    html: `${url} went down at ${new Date(Date.now()).toISOString()}`,
  };

  console.log(email, url);
  /*
    await sgMail
      .send(ops)
      .then(() => resolve("nice"))
      .catch((err) => reject(err));
      
 */
};
