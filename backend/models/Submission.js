import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: String,
  company: String,
  gender: String,
  age: Number,
  email: String,
  contactNumber: String,
  query: String,
  disposition: String,
  notifiedEmail: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);