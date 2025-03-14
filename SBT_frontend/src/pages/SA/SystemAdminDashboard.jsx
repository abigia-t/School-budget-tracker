import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SystemAdminDashboard = () => {
  const [recipientType, setRecipientType] = useState("actors");
  const [recipientDetail, setRecipientDetail] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ Added missing messages state

  useEffect(() => {
    fetchNotifications();
    fetchMessages(); // ✅ Fetch user messages
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Notifications Error:", error);
      toast.error("Failed to fetch notifications.");
      setNotifications([]);
    }
  };

  // ✅ Fetch user messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Messages Error:", error);
      toast.error("Failed to fetch user messages.");
      setMessages([]);
    }
  };

  // Send notification
  const handleSendNotification = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/notifications/send", {
        recipientType,
        recipientDetail: recipientDetail.trim() || null,
        message,
      });

      toast.success(res.data.message);
      setMessage("");
      setRecipientDetail("");
      fetchNotifications();
    } catch (error) {
      console.error("Send Notification Error:", error);
      toast.error("Failed to send notification.");
    }
  };

  return (
    <div>
      {/* Dashboard Summary */}
      <div className="bg-white grid grid-cols-3 gap-4 p-4">
        {[
          { title: "Total Actors", count: "number" },
          { title: "Total Students", count: "number" },
          { title: "Total Registered", count: "number" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-200 shadow-md rounded-lg p-6"
          >
            <h1 className="text-lg font-semibold text-gray-700">{item.title}</h1>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{item.count}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white grid grid-cols-2">
        {/* Send Notifications Section */}
        <div className="bg-slate-600 p-6">
          <h2 className="text-2xl font-semibold mb-4">Send Notifications</h2>

          <div className="mb-4">
            <label className="block font-medium">Recipient Type:</label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="actors">All Actors</option>
              <option value="student_parents">All Student Parents</option>
              <option value="specific_actor">Specific Actor</option>
              <option value="specific_student">Specific Student</option>
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
            Send Notification
          </button>

          {/* Notification History */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Notification History</h3>
            <div className="border rounded p-4 mt-2">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="border-b py-2">
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
                ))
              ) : (
                <p>No notifications found.</p>
              )}
            </div>
          </div>
        </div>

        {/* User Messages Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Messages</h2>

          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Name:</span> {msg.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Email:</span> {msg.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Message:</span> {msg.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Sent on: {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}
                  </p>
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
