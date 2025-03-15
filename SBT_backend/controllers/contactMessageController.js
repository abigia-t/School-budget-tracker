import ContactMessage from "../models/contactMessageModel.js";

// ✅ Add (Send) a new contact message
export const sendContactMessage = async (req, res) => {
  const { userName, userEmail, userMessage } = req.body;

  try {
    const newMessage = new ContactMessage({
      userName,
      userEmail,
      userMessage,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Send Contact Message Error:", error);
    res.status(500).json({ message: "Failed to send message.", error });
  }
};

// ✅ Fetch all contact messages
export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch Contact Messages Error:", error);
    res.status(500).json({ message: "Failed to retrieve messages.", error });
  }
};

// ✅ Delete a contact message by ID
export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found!" });
    }

    res.status(200).json({ message: "Message deleted successfully!" });
  } catch (error) {
    console.error("Delete Contact Message Error:", error);
    res.status(500).json({ message: "Failed to delete message.", error });
  }
};
