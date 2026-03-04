require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { recieveEmail } = require('./brevo');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

app.use(
  router.post('/email', (req, res) => {
    try {
      const { fullname, email, subject, message, myEmail } = req.body;
      const formattedName = `${fullname.split(' ')
        .map(e => e[0]?.toUpperCase() + e.slice(1)?.toLowerCase())
        .join(' ')
        }`
      res.status(200).json({
        status: true,
        message: 'Message sent successfully'
      });

      (async () => {
        try {
          // await recieveEmail({
          //   name: formattedName,
          //   email: myEmail.toLowerCase(),
          //   subject: subject,
          //   html: `
          //         <h2>New Contact Message from ${formattedName}</h2>
          //         <p><strong>Email:</strong> ${email.toLowerCase()}</p>
          //         <p><strong>Message:</strong></p>
          //         <p>${message}</p>
          //       `
          // });
       
           const apikey = process.env.BREVO_API_KEY;
              const apiInstance = new Brevo.TransactionalEmailsApi();
              apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apikey);
              const sendSmtpEmail = new Brevo.SendSmtpEmail();
              sendSmtpEmail.subject = options.subject;
              sendSmtpEmail.to = [{ email: options.email }];
              sendSmtpEmail.sender = { name: options.name, email: process.env.BREVO_SENDER_EMAIL };
              sendSmtpEmail.htmlContent = options.html;
              const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
              console.log("Email sent to:", options.email);
            } catch (error) {
              throw new Error("Email not sent to:", options.email)
            }
      })();
    } catch (error) {
      res.status(500).json({
        messae: `Error sending email: ${error.message}`
      })
    }
  })
)

app.listen(PORT, () => {
  console.log(`Server is listening to Port: ${PORT}`)
})