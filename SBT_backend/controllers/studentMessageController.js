import Message from "../models/adminMessageModel.js";
import Student from "../models/studentModel.js";

// Get messages for a specific student
const getMessages = async (req, res) => {
  const id = req.query.id;
  try {
    // Check if the student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Fetch messages sent to the specific student
    const studentMessages = await Message.find({
      recipientType: "specific_student",
      recipientDetail: student.studentId,
    }).sort({ createdAt: -1 });

    //   parent messages
    const parentMessages = await Message.find({
      recipientType: "student_parents",
    }).sort({ createdAt: -1 });

    const messages = [...studentMessages, ...parentMessages];

    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch Student Messages Error:", error);
    res.status(500).json({ message: "Failed to fetch messages.", error });
  }
};

export default getMessages;
