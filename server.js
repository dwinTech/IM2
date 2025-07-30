const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;

app.use(express.json()); // ✅ Body parser

let contacts = require("./contact.json"); // read contacts from JSON file

// 🔹 GET all contacts
app.get("/api/contact", (req, res) => {
  res.json(contacts);
});

// 🔹 POST add a contact
app.post("/api/add-contact", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    phone
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// 🔹 PUT update a contact
app.put("/api/contact/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);

  if (!contact) return res.status(404).json({ error: "Contact not found" });

  const { name, phone } = req.body;
  contact.name = name || contact.name;
  contact.phone = phone || contact.phone;

  res.json(contact);
});

// 🔹 DELETE a contact
app.delete("/api/contact/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Contact not found" });

  contacts.splice(index, 1);
  res.json({ message: "Contact deleted" });
});

// 🔹 Test route
app.post("/api/like", (req, res) => {
  res.json({ gege: "gege" });
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
