import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
  // State for User Messages
  const [messages, setMessages] = useState([]);

  // State for 
  const [recipientType, setRecipientType] = useState("actors");
  const [recipientDetail, setRecipientDetail] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Fetch User Messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/contact-messages"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages.");
      }
    };

    fetchMessages();
  }, []);
 // Handlers
 const handleDeleteMessage = async (id) => {
  if (!window.confirm("Are you sure you want to delete this message?"))
    return;
  try {
    await axios.delete(`http://localhost:5000/api/contact-messages/${id}`);
    setMessages(messages.filter((msg) => msg._id !== id));
    toast.success("Message deleted successfully.");
  } catch (error) {
    console.error("Error deleting message:", error);
    toast.error("Failed to delete message.");
  }
};


const handleSendNotification = async () => {
  if (!message.trim()) {
    return toast.error("Message cannot be empty!");
  }

  try {
    const response = await axios.post("http://localhost:5000/api/admin-messages/send", {
      recipientType,
      recipientDetail,
      message,
    });

    toast.success(response.data.message);
    setMessage(""); // Clear input after sending
    fetchNotifications(); // Refresh notifications
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message.");
  }
};

// Fetch notifications (useEffect hook to load on mount)
const fetchNotifications = async () => {
try {
  const response = await axios.get("http://localhost:5000/api/admin-messages/all");
  setNotifications(response.data);
} catch (error) {
  toast.error("Failed to load messages.");
}
};

const handleDeleteNotification = async (messageId) => {
  try {
    await axios.delete(`http://localhost:5000/api/admin-messages/${messageId}`);
    toast.success("Message deleted!");
    fetchNotifications(); // Refresh notifications
  } catch (error) {
    toast.error("Failed to delete message.");
  }
};

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-md grid grid-cols-2 gap-6">
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          User Messages
        </h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Name:</span>{" "}
                  {msg.userName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  {msg.userEmail}
                </p>
                <p className="text-gray-600 break-words">
                  <span className="font-semibold text-gray-800">Message:</span>{" "}
                  {msg.userMessage}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Sent on: {new Date(msg.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages received yet.</p>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4">Send Messages</h2>

        {/* Recipient Type Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Recipient Type:</label>
          <select
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="actors">All Staff</option>
            <option value="student_parents">All Parents</option>
            <option value="specific_actor">Specific Staff</option>
            <option value="specific_student">Specific Parent</option>
          </select>
        </div>

        {/* Recipient Detail Input */}
        {(recipientType === "specific_actor" ||
          recipientType === "specific_student") && (
          <div className="mb-4">
            <label className="block font-medium mb-1">
              {recipientType === "specific_actor"
                ? "Staff Email:"
                : "Student ID:"}
            </label>
            <input
              type="text"
              value={recipientDetail}
              onChange={(e) => setRecipientDetail(e.target.value)}
              placeholder={
                recipientType === "specific_actor"
                  ? "Enter staff email"
                  : "Enter student ID"
              }
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Message Input */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            className="border rounded p-2 w-full h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Notification Button */}
        <button
          onClick={handleSendNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 w-full transition-colors"
        >
          Send 
        </button>

        {/* Notification History */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2">Message History</h4>
          <div className="border rounded p-4 max-h-[50vh] overflow-y-auto pr-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p>
                      <strong>Type:</strong> {notification.recipientType}
                    </p>
                    {notification.recipientDetail && (
                      <p>
                        <strong>Recipient:</strong>{" "}
                        {notification.recipientDetail}
                      </p>
                    )}
                    <p className="break-words">
                      <strong>Message:</strong> {notification.message}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Sent by {notification.sentBy?.email || "Unknown"} -{" "}
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No message found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
