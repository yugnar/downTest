const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailNotif = (email, url) => {
  return new Promise(async (reject, resolve) => {
    const ops = {
      to: email,
      from: "elemailbaaqui",
      subject: `WARNING!!!! ${url} is down`,
      html: `${url} went down at ${new Date(Date.now()).toISOString()}`,
    };

    await sgMail
      .send(ops)
      .then(() => resolve("nice"))
      .catch((err) => reject(err));
  });
};
