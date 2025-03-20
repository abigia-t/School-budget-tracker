import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const SystemAdminDashboard = () => {
  const { stats } = useContext(StoreContext);
  const statsData = [
    { title: "Total Staff", count: stats.totalActors },
    { title: "Total Students", count: stats.totalStudents },
    { title: "Total Registered", count: stats.totalRegistered },
  ];

  const [recipientType, setRecipientType] = useState("actors");
  const [recipientDetail, setRecipientDetail] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ Added missing messages state

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
   // Fetch messages from user backend
   useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages.");
      }
    };

    fetchMessages();
  }, []);

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact-messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className="bg-white">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-3 gap-4 p-4">
      {statsData.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center shadow-md rounded-lg p-6
          ${
            index === 0
              ? "bg-blue-200"
              : index === 1
              ? "bg-green-200"
              : "bg-yellow-200"
          }`}
        >
          <h1 className="text-lg font-semibold text-gray-700">{item.title}</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">{item.count}</h2>
        </div>
      ))}
    </div>

      <div className="bg-white grid grid-cols-2">
        {/* Send Notifications Section */}
        <div className="bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-4">Send Messages</h2>

          <div className="mb-4">
            <label className="block font-medium">Recipient Type:</label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="actors">For all Staffs</option>
              <option value="student_parents">For all parents</option>
              <option value="specific_actor">Specific Staff</option>
              <option value="specific_student">Specific Parent</option>
            </select>
          </div>

          {(recipientType === "specific_actor" || recipientType === "specific_student") && (
            <div className="mb-4">
              <label className="block font-medium">
                {recipientType === "specific_actor" ? "Actor Email:" : "Student ID:"}
              </label>
              <input
                type="text"
                value={recipientDetail}
                onChange={(e) => setRecipientDetail(e.target.value)}
                placeholder={
                  recipientType === "specific_actor" ? "Enter actor email" : "Enter student ID"
                }
                className="border rounded p-2 w-full"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter notification message"
              className="border rounded p-2 w-full"
            />
          </div>

          <button
            onClick={handleSendNotification}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>

          {/* Notification History */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Message History</h3>
            <div className="border rounded p-4 mt-2">
              {notifications.length > 0 ? (
               notifications.map((notification, index) => (
    <div key={index} className="border-b py-2 flex justify-between items-center">
      <div>
        <p>
          <strong>Type:</strong> {notification.recipientType}
        </p>
        {notification.recipientDetail && (
          <p>
            <strong>Recipient:</strong> {notification.recipientDetail}
          </p>
        )}
        <p>
          <strong>Message:</strong> {notification.message}
        </p>
        <p className="text-gray-500 text-sm">
          Sent by {notification.sentBy?.email || "Unknown"} -{" "}
          {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "N/A"}
        </p>
      </div>
      <button
        onClick={() => handleDeleteNotification(notification._id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ))
) : (
  <p>No message found.</p>
)}

            </div>
          </div>
        </div>

        {/* User Messages Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Messages</h2>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Name:</span> {msg.userName}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Email:</span> {msg.userEmail}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Message:</span> {msg.userMessage}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Sent on: {new Date(msg.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(msg._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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
      </div>
    </div>
  );
};

export default SystemAdminDashboard;