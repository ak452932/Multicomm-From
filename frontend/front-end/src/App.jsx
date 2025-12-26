import React, { useState } from "react";

const API = "http://localhost:4000/api/submit";

export default function App() {
  const [form, setForm] = useState({
    name: "", company: "", gender: "Male", age: "", email: "",
    contactNumber: "", query: "", disposition: "Customer Support"
  });
  const [status, setStatus] = useState("");

  const dispositions = [
    "Customer Support", "Consultant Support", "B2B Lead", "New Lead", "General Enquiry"
  ];

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setStatus(data.message || data.error);
    } catch (err) {
      setStatus("Error submitting form");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>MultyComm Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(key => (
          key !== "disposition" ? (
            <div key={key}>
              <label>{key}</label>
              <input name={key} value={form[key]} onChange={handleChange} required />
            </div>
          ) : null
        ))}
        <label>Disposition</label>
        <select name="disposition" value={form.disposition} onChange={handleChange}>
          {dispositions.map(d => <option key={d}>{d}</option>)}
        </select>
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
}