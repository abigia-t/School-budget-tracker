import React, { useState } from 'react';
import ParentTopBar from '../../components/ParentTopBar'; // Adjust the path as necessary
import NotificationList from './NotificationList'; // Adjusted import for the same folder

const ParentsPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Sample user data (replace with actual user data)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    gender: "male",
    role: "Parent",
  };

  // Sample budget-related notifications
  const notifications = [
    { id: 1, title: "Tuition Reminder", message: "Your tuition payment is due on the 5th.", date: new Date() },
    { id: 2, title: "Discount Available", message: "Pay before the end of the month to receive a 10% discount.", date: new Date() },
    { id: 3, title: "Penalty Notice", message: "A penalty of 50 ETB will be applied if payment is not received by the due date.", date: new Date() },
  ];

  const handlePayment = () => {
    // Implement payment logic with Chapa Payment Gateway here
    console.log("Redirecting to Chapa Payment Gateway...");
  };

  const handleReceiptUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setReceiptImage(URL.createObjectURL(file));
      setUploadStatus('Receipt uploaded successfully!');
    } else {
      setUploadStatus('Failed to upload receipt.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the image to your server
    console.log('Submitting receipt:', receiptImage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ParentTopBar user={user} onNotificationClick={() => setShowNotifications(!showNotifications)} />

      <div className="flex-grow p-6 mt-20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}> {/* Allow scroll when needed */}
        <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
        <p className="mt-4">Manage your tuition payments and view important notices below.</p>

        {/* Payment Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Tuition Payment</h3>
          <button 
            onClick={handlePayment} 
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:from-blue-500 hover:to-purple-600 transition">
            Pay Tuition Now
          </button>
        </div>

        {/* Receipt Upload Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold">Upload Receipt</h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleReceiptUpload}
              className="mt-4 border border-gray-300 rounded p-2"
            />
            {receiptImage && (
              <img src={receiptImage} alt="Uploaded Receipt" className="h-32 w-auto mt-4 rounded shadow-md" />
            )}
            <button 
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:from-blue-500 hover:to-purple-600 transition mt-4">
              Submit Receipt
            </button>
            {uploadStatus && <p className="mt-2 text-green-500">{uploadStatus}</p>}
          </form>
        </div>

        {/* Display Notifications if visible */}
        {showNotifications && <NotificationList notifications={notifications} />}
      </div>
    </div>
  );
};

export default ParentsPage;