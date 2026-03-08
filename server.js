require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { recieveEmail } = require('./brevo');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/email', async (req, res) => {
  try {
    const { fullname, clientEmail, subject, message, myEmail } = req.body;
    
    await recieveEmail({
      name: `${fullname.trim().split(' ').map(e => e[0]?.toUpperCase() + e.slice(1)?.toLowerCase())[0]}`,
      email: myEmail.toLowerCase(),
      subject: `${subject.trim().split(' ').map(e => e[0]?.toUpperCase() + e.slice(1)?.toLowerCase()).join(' ')}`,
      html: `
              <h2>New Message from: ${fullname.trim().split(' ').map(e => e[0]?.toUpperCase() + e.slice(1)?.toLowerCase()).join(' ')}</h2>
              <p><strong>Email:</strong> ${clientEmail.toLowerCase()}</p>
              <p>${message.trim()}</p>
            `
    });
    return res.status(200).json({
      status: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messae: `Error sending email: ${error.message}`
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening to Port: ${PORT}`)
});