const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //Create  a  transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Define the email options
  const mailOptions = {
    from: 'Phong Nguyen Hoai <hoaiphongpvt@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
