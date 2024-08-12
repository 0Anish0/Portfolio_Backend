const express = require('express');
const router = express.Router();
const transporter = require('../Config/mailer');

router.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptionsUser = {
        from: process.env.SENDER_EMAIL,
        to: `anishpandey4576@gmail.com`,
        subject: `Contact Form Submission: (${subject})`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    const mailOptionsAutoReply = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Thank you for your query! ${subject}`,
        text: `Dear ${name},\n\nThank you for reaching out. We have received your query and will get back to you shortly.\n\nYour message: "${message}"\n\nBest Regards,\nEr. Anish Kumar Pandey`,
    };

    try {
        await transporter.sendMail(mailOptionsUser);
        await transporter.sendMail(mailOptionsAutoReply);
        res.status(200).json({ message: 'Query submitted and emails sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'There was an error sending your query. Please try again later.' });
    }
});

module.exports = router;