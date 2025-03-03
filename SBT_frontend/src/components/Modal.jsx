import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Modal = ({
  isOpen,
  title,
  children,
  onSubmit,
  onClose,
  submitButtonText,
}) => {
  if (!isOpen) return null;

  const initialValues = {
    requestCategory: '',
    fiscalYear: '',
    subject: '',
    description: '',
    amount: '',
    attachments: [],
    approver: '',
  };

  const validationSchema = Yup.object({
    requestCategory: Yup.string().required('Required'),
    fiscalYear: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    amount: Yup.number().positive('Must be a positive number').optional(),
    approver: Yup.string().required('Required'),
  });

  const handleFileChange = (e, setFieldValue) => {
    setFieldValue('attachments', [...e.target.files]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-6">
          {children || (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div>
                    <label>Request Category:</label>
                    <Field as="select" name="requestCategory" required className="bg-gray-100">
                      <option value="">Select...</option>
                      <option value="budgetAdjustment">School Budget Adjustment</option>
                      <option value="emergencyFund">Emergency Fund Request</option>
                      <option value="largePurchase">Large Purchase Approval</option>
                      <option value="contractApproval">Contract Approval</option>
                    </Field>
                    <ErrorMessage name="requestCategory" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label>Fiscal Year:</label>
                    <Field as="select" name="fiscalYear" required className="bg-gray-100">
                      <option value="">Select...</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                    </Field>
                    <ErrorMessage name="fiscalYear" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label>Amount Involved (if applicable):</label>
                    <Field type="number" name="amount" className="bg-gray-100" />
                    <ErrorMessage name="amount" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label>Supporting Documents:</label>
                    <input type="file" multiple onChange={(e) => handleFileChange(e, setFieldValue)} />
                  </div>
                  <div>
                    <label>Detailed Description:</label>
                    <Field as="textarea" name="description" required className="bg-gray-100" />
                    <ErrorMessage name="description" component="div" className="text-red-500" />
                  </div>
                  <div>
                    <label>Approver:</label>
                    <Field as="select" name="approver" required className="bg-gray-100">
                      <option value="">Select...</option>
                      <option value="generalManager">General Manager</option>
                      <option value="auditor">Auditor</option>
                    </Field>
                    <ErrorMessage name="approver" component="div" className="text-red-500" />
                  </div>

                  {/* Modal Footer */}
                  <div className="mt-6 flex justify-around">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-700 hover:text-gray-900 font-semibold py-2 px-4 rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-red-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
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
