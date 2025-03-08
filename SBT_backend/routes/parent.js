const express = require("express");
const router = express.Router();

const parent = {
  fullName: "Ayele Assefa",
  email: "Ayele.Assefa@email.com",
  password: "hashedpassword123",
  phoneNumber: "555-123-4567",
  address: "123 Main St, Springfield, IL 62701",
  role: "Parent",
  children: [
    {
      id: 1,
      name: "lemu ayele",
      amountDue: 50.0,
      dueDate: "2025-03-10",
      paid: false,
    },
    {
      id: 2,
      name: "Hiwot Ayele",
      amountDue: 50.0,
      dueDate: "2025-03-15",
      paid: false,
    },
  ],
};

router.get("/", (req, res) => {
  res.json(parent);
});

console.log(parent);

module.exports = router;
