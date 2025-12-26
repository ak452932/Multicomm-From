# MultyComm MERN Form

## 📌 Overview
This project is a **MERN-based full-stack form application** for MultyComm.  
It captures client data, saves it to MongoDB, and conditionally sends email notifications based on the selected **Disposition**.

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Email Service:** Nodemailer (SMTP with Gmail App Password)

---

## 🎯 Features
- Collects client details:
  - Name, Company, Gender, Age, Email, Contact Number, Query, Disposition
- Saves submissions to MongoDB
- Sends email notifications based on **Disposition**:
  - Customer Support → ayan@multycomm.com  
  - Consultant Support → akash@multycomm.com  
  - B2B Lead → deepak@multycomm.com  
  - New Lead → aveek@multycomm.com  
  - General Enquiry → *no email sent, only saved to DB*
- Email content includes client details in a structured format

---

## 🏗️ Architecture
