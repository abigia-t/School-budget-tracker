const express = require("express");
const router = express.Router();

const students = [
  {
    studentId: "1",
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    email: "john.doe@example.com",
    password: "password123",
    phoneNumber: "0912345678",
    address: "New York, USA",
  },
  {
    studentId: "2",
    firstName: "Ayele",
    middleName: "Abebe",
    lastName: "KKKK",
    email: "ayele9@ayu.com",
    password: "3333333",
    phoneNumber: "0984143530",
    address: "Hossana",
  },
  {
    studentId: "3",
    firstName: "Sara",
    middleName: "Jane",
    lastName: "Williams",
    email: "sara.jane@example.com",
    password: "pass456",
    phoneNumber: "0987654321",
    address: "Toronto, Canada",
  },
  {
    studentId: "4",
    firstName: "Michael",
    middleName: "Anthony",
    lastName: "Brown",
    email: "michael.brown@example.com",
    password: "securepass",
    phoneNumber: "0976543210",
    address: "Los Angeles, USA",
  },
  {
    studentId: "5",
    firstName: "Lina",
    middleName: "Grace",
    lastName: "Anderson",
    email: "lina.grace@example.com",
    password: "mypassword",
    phoneNumber: "0911223344",
    address: "Addis Ababa, Ethiopia",
  },
];

const parent = {
  fullName: "Ayele Assefa",
  email: "Ayele.Assefa@email.com",
  password: "hashedpassword123",
  phoneNumber: "555-123-4567",
  address: "123 Main St, Springfield, IL 62701",
  role: "Parent",
  children: students,
};

router.get("/", (req, res) => {
  res.json(parent);
});

console.log(parent);

module.exports = router;
