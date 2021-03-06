const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = require("express").Router();

router.post("/", async (req, res) => {
  // const emailRecip = req.body.email;
  // console.log(req.body.email);
  const msg = {
    to: "jon.m.bowman@gmail.com", // Change to your recipient
    from: "insomniathai@yahoo.com", // Change to your verified sender
    subject: `Your reservation on ${req.body.date_of_res}`,
    text: `Your reservation on ${req.body.date_of_res} at ${req.body.time} is confirmed`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).json({ message: "email sent" });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
