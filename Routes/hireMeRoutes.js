const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = require('../Config/mailer');

router.post("/hire", async (req, res) => {
    const { 
        jobType, 
        requirement, 
        otherRequirement, 
        role, 
        otherRole, 
        description, 
        companyName, 
        workMode, 
        officeLocation,
        contactType, 
        contactDetail 
    } = req.body;

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: 'anishpandey4576@gmail.com',
        subject: `${companyName} Wants to Hire You`,
        html: `
            <h3>New Hiring Form Submission</h3>
            <p><strong>Job Type:</strong> ${jobType}</p>
            <p><strong>Requirement:</strong> ${requirement} ${requirement === 'other' ? `(${otherRequirement})` : ''}</p>
            <p><strong>Role:</strong> ${role} ${role === 'other' ? `(${otherRole})` : ''}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Company Name:</strong> ${companyName}</p>
            <p><strong>Work Mode:</strong> ${workMode}</p>
            <p><strong>Job Location:</strong> ${officeLocation} || Not Required</p>
            <p><strong>Contact Type:</strong> ${contactType}</p>
            <p><strong>Contact Detail:</strong> ${contactDetail}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        if (contactType === 'Email') {
            const autoReplyOptions = {
                from: process.env.SENDER_EMAIL,
                to: contactDetail,
                subject: `Thank you for reaching out to Anish Kumar Pandey`,
                html: `
                    <h3>Thank you for your interest, ${companyName}!</h3>
                    <p>We have received your request to hire me for the role of <strong>${role}</strong> and will get back to you shortly.</p>
                    <p>Here is a summary of your request:</p>
                    <p><strong>Job Type:</strong> ${jobType}</p>
                    <p><strong>Requirement:</strong> ${requirement} ${requirement === 'other' ? `(${otherRequirement})` : ''}</p>
                    <p><strong>Role:</strong> ${role} ${role === 'other' ? `(${otherRole})` : ''}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Work Mode:</strong> ${workMode}</p>
                    <p><strong>Job Location:</strong> ${officeLocation} || Not Required</p>
                    <p>If you have any additional questions, please feel free to reply to this email.</p>
                    <p>Best Regards,<br>Er. Anish Kumar Pandey</p>
                `
            };
            await transporter.sendMail(autoReplyOptions);
        }
        res.status(200).json({ message: "Form submitted and emails sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "There was an error submitting the form" });
    }
});

module.exports = router;