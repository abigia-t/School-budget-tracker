import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEye, FaPlus } from 'react-icons/fa';

const ResourceAndFinanceHeadRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedBudgets, setSubmittedBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'submittedAt', direction: 'desc' });

  const notify = (message, type = 'success') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const sortedBudgets = React.useMemo(() => {
    let sortableBudgets = [...submittedBudgets];
    if (sortConfig.key) {
      sortableBudgets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBudgets;
  }, [submittedBudgets, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'attachments' && value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
  
      if (values.attachments) {
        Array.from(values.attachments).forEach(file => {
          if (file instanceof File) {
            formData.append('attachments', file);
          }
        });
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/fhbudgets',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      if (response.status !== 201) {
        throw new Error(response.data?.message || 'Unexpected response');
      }
  
      notify("Budget request created successfully!");
      
      setIsModalOpen(false);
      resetForm();
      fetchBudgets();
      
    } catch (err) {
      console.error("Error:", err);
      notify(err.response?.data?.message || err.message || "Operation failed", 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchBudgets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/fhbudgets', {
        timeout: 5000
      });
      const data = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.data) 
          ? response.data.data 
          : [response.data?.data || response.data];
      setSubmittedBudgets(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || err.message);
      notify('Failed to load budget requests', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this budget request?')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/fhbudgets/${id}`);
      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Failed to delete');
      }
      notify('Budget request deleted successfully');
      fetchBudgets();
    } catch (err) {
      console.error("Delete error:", err);
      notify(err.response?.data?.message || 'Failed to delete budget request', 'error');
    }
  };

  const handleViewFile = (file) => {
    const cleanFileName = file.path.replace(/^uploads[\\/]/, '');
    const fileUrl = `http://localhost:5000/uploads/${cleanFileName}`;
    
    setViewingFile({
      url: fileUrl,
      name: file.filename,
      type: file.mimetype
    });
    setShowFileModal(true);
  };

  const handleCloseFileModal = () => {
    setShowFileModal(false);
    setViewingFile(null);
  };

  const FileViewerModal = () => {
    if (!showFileModal || !viewingFile) return null;

    const isImage = viewingFile.type.startsWith('image/');
    const isPDF = viewingFile.type === 'application/pdf';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{viewingFile.name}</h3>
            <button 
              onClick={handleCloseFileModal}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex justify-center">
            {isImage ? (
              <img 
                src={viewingFile.url} 
                alt={viewingFile.name} 
                className="max-w-full max-h-[70vh]"
              />
            ) : isPDF ? (
              <iframe 
                src={viewingFile.url} 
                className="w-full h-[70vh] border-none"
                title={viewingFile.name}
              />
            ) : (
              <div className="text-center p-4">
                <p className="mb-4">This file type cannot be previewed.</p>
                <a
                  href={viewingFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Open in New Tab
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCloseFileModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchBudgets();
  }, [isModalOpen]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white w-12 h-12 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg"
          title="New Budget Request"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Add New Expense"
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          submitButtonText="Submit Request"
        />
      )}

      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">Finincial Head Expense</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-3 text-gray-600">Loading budget requests...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('requestCategory')}
                  >
                    Category
                    {sortConfig.key === 'requestCategory' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('fiscalYear')}
                  >
                    Fiscal Year
                    {sortConfig.key === 'fiscalYear' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('amount')}
                  >
                    Amount (ETB)
                    {sortConfig.key === 'amount' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('submittedAt')}
                  >
                    Date
                    {sortConfig.key === 'submittedAt' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBudgets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No budget requests found.
                    </td>
                  </tr>
                ) : (
                  sortedBudgets.map((budget) => (
                    <tr key={budget._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {budget.requestCategory || 'Uncategorized'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {budget.fiscalYear}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {budget.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {budget.amount?.toLocaleString('en-ET') || '0'} ETB
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(budget.submittedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3 justify-end">
                          <button
                            onClick={() => handleDelete(budget._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          {budget.attachments?.length > 0 && (
                            <button
                              onClick={() => handleViewFile(budget.attachments[0])}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Attachment"
                            >
                              <FaEye />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FileViewerModal />
    </div>
  );
};

export default ResourceAndFinanceHeadRequest;;


