import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Modal = ({ isOpen, title, children, onSubmit, onClose, submitButtonText }) => {
  if (!isOpen) return null;

  const initialValues = {
    requestCategory: '',
    fiscalYear: '',
    subject: '',
    description: '',
    amount: '',
    attachments: [],
  };

  const validationSchema = Yup.object({
    requestCategory: Yup.string().required('Required'),
    fiscalYear: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    amount: Yup.number().positive('Must be a positive number').optional(),
  });

  const handleFileChange = (e, setFieldValue) => {
    setFieldValue('attachments', [...e.target.files]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] p-6 rounded-2xl shadow-xl overflow-y-auto relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          {children || (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium">Request Category:</label>
                    <Field as="select" name="requestCategory" className="w-full p-3 border rounded-lg">
                      <option value="">Select...</option>
                      <option value="budgetAdjustment">School Budget Adjustment</option>
                      <option value="emergencyFund">Emergency Fund Request</option>
                      <option value="largePurchase">Large Purchase Approval</option>
                      <option value="contractApproval">Contract Approval</option>
                    </Field>
                    <ErrorMessage name="requestCategory" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-lg font-medium">Fiscal Year:</label>
                    <Field as="select" name="fiscalYear" className="w-full p-3 border rounded-lg">
                      <option value="">Select...</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                    </Field>
                    <ErrorMessage name="fiscalYear" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-lg font-medium">Amount Involved (if applicable):</label>
                    <Field type="number" name="amount" className="w-full p-3 border rounded-lg" />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-lg font-medium">Supporting Documents:</label>
                    <input type="file" multiple onChange={(e) => handleFileChange(e, setFieldValue)} className="w-full p-3 border rounded-lg"/>
                  </div>

                  <div>
                    <label className="block text-lg font-medium">Detailed Description:</label>
                    <Field as="textarea" name="description" className="w-full p-3 border rounded-lg" />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Modal Footer */}
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-5 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                    >
                      {submitButtonText || "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;