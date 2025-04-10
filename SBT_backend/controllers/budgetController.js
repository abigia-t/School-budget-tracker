import BudgetRequest from '../models/BudgetRequest.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createBudgetRequest = async (req, res) => {
  try {
    const { requestCategory, fiscalYear, subject, description, amount } = req.body;
    
    if (!requestCategory || !fiscalYear || !description || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const attachments = req.files?.map(file => ({
      filename: file.originalname,
      path: file.filename,
      mimetype: file.mimetype,
      size: file.size
    })) || [];

    const newRequest = new BudgetRequest({
      requestCategory,
      fiscalYear,
      subject,
      description,
      amount,
      attachments
    });

    await newRequest.save();
    
    res.status(201).json({
      success: true,
      data: newRequest
    });
    
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create budget request'
    });
  }
};

export const getBudgetRequests = async (req, res) => {
  try {
    const { status, fiscalYear, search } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (fiscalYear) filter.fiscalYear = fiscalYear;
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const requests = await BudgetRequest.find(filter)
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requests'
    });
  }
};

export const getBudgetRequestById = async (req, res) => {
  try {
    const request = await BudgetRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Fetch Single Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch request'
    });
  }
};

export const updateBudgetRequest = async (req, res) => {
    try {
      const { requestCategory, fiscalYear, subject, description, amount, status } = req.body;
      
      // Validate required fields
      if (!requestCategory || !fiscalYear || !description || amount === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
  
      const updateData = {
        requestCategory,
        fiscalYear,
        subject,
        description,
        amount,
        status
      };
  
      // Handle file attachments if they exist
      if (req.files && req.files.length > 0) {
        // Get existing request to clean up old files
        const existingRequest = await BudgetRequest.findById(req.params.id);
        
        // Delete old files if they exist
        if (existingRequest.attachments?.length > 0) {
          existingRequest.attachments.forEach(file => {
            const filePath = path.join(__dirname, '../uploads', file.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          });
        }
        
        // Add new attachments
        updateData.attachments = req.files.map(file => ({
          filename: file.originalname,
          path: file.filename,
          mimetype: file.mimetype,
          size: file.size
        }));
      }
  
      const updatedRequest = await BudgetRequest.findByIdAndUpdate(
        req.params.id,
        updateData,
        { 
          new: true,
          runValidators: true,
          context: 'query' // Ensures proper validation
        }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({
          success: false,
          message: 'Budget request not found'
        });
      }
  
      res.json({
        success: true,
        data: updatedRequest,
        message: 'Budget request updated successfully'
      });
      
    } catch (error) {
      console.error('Update Error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update budget request'
      });
    }
  };

export const deleteBudgetRequest = async (req, res) => {
  try {
    const request = await BudgetRequest.findByIdAndDelete(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    // Delete associated files
    if (request.attachments?.length > 0) {
      request.attachments.forEach(file => {
        const filePath = path.join(__dirname, '../uploads', file.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.json({
      success: true,
      message: 'Request deleted successfully'
    });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete request'
    });
  }
};

export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date(),
    version: '1.0.0'
  });
};