// server.js (Backend code)

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // To serve static HTML

// Set up nodemailer transporter with your Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-email-password'   // Use an app password or your Gmail password
    }
});

// Endpoint to handle comment submissions
app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;
    if (comment) {
        // Send the comment to your Gmail address
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'your-email@gmail.com',  // Recipient email (your Gmail)
            subject: 'New Comment Submitted',
            text: `You have received a new comment: \n\n ${comment}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Comment submitted and email sent' });
        });
    } else {
        res.status(400).json({ message: 'Comment is required' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});