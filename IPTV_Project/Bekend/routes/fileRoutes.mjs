import express from 'express';
import {getAllFiles, getFileById, uploadFile, uploadMiddleware } from '../controllers/fileController.mjs';
import { authenticateToken } from '../middlewares/authMiddleware.mjs';


const router = express.Router();
router.post('/', authenticateToken, uploadMiddleware, uploadFile);
router.get('/:id', authenticateToken, getFileById);
router.get('/', authenticateToken, getAllFiles);
// router.put('/:id', authenticateToken, updateFileById);
// router.delete('/:id', authenticateToken, deleteFileById);

export default router;
