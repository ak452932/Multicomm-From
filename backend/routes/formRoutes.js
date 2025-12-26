import express from "express";
import Submission from "../models/Submission.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // make sure environment variables are loaded

const router = express.Router();

const DISPOSITION_EMAILS = {
  "Customer Support": "akhileshkumar545232@gmail.com",
  "Consultant Support": "akhileshkumar545232@gmail.com",
  "B2B Lead": "ak452932@gmail.com",
  "New Lead": "ak452932@gmail.com",
  "General Enquiry": null
};

// Configure transporter with Gmail + App Password
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post("/submit", async (req, res) => {
  try {
    // Save submission to MongoDB
    const submission = await Submission.create(req.body);
    const to = DISPOSITION_EMAILS[req.body.disposition];

    // Only send email if disposition is not "General Enquiry"
    if (to) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "New Client Enquiry from MultyComm Form",
        text: `
Greetings!
We have received an inquiry for the client detailed below. Please provide them with the necessary assistance.

Client/Caller Name: ${req.body.name}
Company: ${req.body.company}
Gender: ${req.body.gender}
Age: ${req.body.age}
Email: ${req.body.email}
Query: ${req.body.query}

Thank You!
        `
      });
    }

    res.json({ message: "Submission saved", submission });
  } catch (err) {
    console.error("Error in /submit route:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;