import express from 'express';
import {
  createBudgetRequest,
  getBudgetRequests,
  getBudgetRequestById,
  updateBudgetRequest,
  deleteBudgetRequest,
  healthCheck
} from '../controllers/budgetController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Routes
router.get('/health', healthCheck);
router.post('/', upload.array('attachments'), createBudgetRequest);
router.get('/', getBudgetRequests);
router.get('/:id', getBudgetRequestById);
router.patch('/:id', updateBudgetRequest);
router.delete('/:id', deleteBudgetRequest);

export default router;