require('dotenv').config();

const express = require('express');
const { recieveEmail } = require('./brevo');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/email', (req, res) => {
  try {
    const { fullname, email, subject, message, myEmail } = req.body;
    res.status(200).json({
      status: true,
      message: 'Message sent successfully'
    });

    (async () => {
      try {
        await recieveEmail({
          myEmail: myEmail.toLowerCase(),
          fullname: `${fullname.split(' ').map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join(' ')}`,
          email: email.toLowerCase(),
          subject: subject.toLowerCase(),
          html: `
                  <h2>New Contact Message from ${formattedName}</h2>
                  <p><strong>Email:</strong> ${newContact.email}</p>
                  <p><strong>User Type:</strong> ${role.toUpperCase()}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                `
        });
      } catch (error) {
        console.error("Post-register async error:", error);
      }
    })();
  } catch (error) {
    res.status(500).json({
      messae: `Error sending email: ${error.message}`
    })
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening to Port: ${PORT}`)
})