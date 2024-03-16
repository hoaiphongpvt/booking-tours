const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

exports.sendEmail = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0]; // Sửa 'fristName' thành 'firstName'
    this.url = url;
    this.from = `Natours <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Return the transport for SendGrid or any other production email service
    } else {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      return transporter;
    }
  }

  //Send the actual email
  async send(template, subject) {
    // Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName, // Sửa 'fristName' thành 'firstName'
      url: this.url,
      subject,
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // Create a transport and send email
    const transporter = this.newTransport(); // Gọi phương thức newTransport() để nhận đối tượng transporter
    await transporter.sendMail(mailOptions); // Gọi phương thức sendMail() của đối tượng transporter
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes.',
    );
  }
};
