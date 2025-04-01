import { useEffect, useState } from "react";

const ParentProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!storedUser) {
      setError("No user data found. Please log in.");
      setLoading(false);
      return;
    }

    setUserData(storedUser);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-500">Loading, please wait...</p>
      </div>
    );

  if (error) return <p className="text-3xl text-red-400">{error}</p>;
  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {userData?.firstName?.charAt(0) || "?"}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">{userData?.email}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Personal Information
        </h3>
        <dl className="space-y-3">
          <div className="flex items-center space-x-2">
            <dt className="font-medium text-gray-700">Role:</dt>
            <dd className="text-gray-600">{userData?.role || "N/A"}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <dt className="font-medium text-gray-700">Grade:</dt>
            <dd className="text-gray-600">{userData?.grade || "N/A"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ParentProfile;
