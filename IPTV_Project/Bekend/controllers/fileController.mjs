import multer from 'multer';
import File from '../models/fileModel.mjs';

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    console.log('File upload initiated');
    if (!req.file) {
      console.log('No file received');
      return res.status(400).json({ error: 'Please upload a file' });
    }

    console.log('File received:', req.file);

    const file = new File({
      original_name: req.file.originalname,
      current_name: req.file.filename,
      path: req.file.path,
    });


    await file.save();
    console.log('File saved to database');
    res.status(201).json(file);
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).json({ error: 'Server error', err });
  }
};


// Middleware for handling file upload
export const uploadMiddleware = upload.single('image');
// Get File by ID
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete File
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    // Since we're not managing the filesystem, no file deletion is needed
    res.status(200).json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Files
export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


