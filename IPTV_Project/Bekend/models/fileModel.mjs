import mongoose from 'mongoose';

// Define the File schema
const fileSchema = new mongoose.Schema({
  original_name: {
    type: String,
    required: true,  // The original name of the file uploaded by the user
  },
  current_name: {
    type: String,
    required: true,  // The current name of the file stored on the server (including unique identifiers if needed)
  },
  path: {
    type: String,
    required: true,  // The path where the file is stored on the server
  },
  uploaded_at: {
    type: Date,
    default: Date.now,  // Automatically set the upload date to the current date and time
  },
});

// Create a Mongoose model from the schema
const File = mongoose.model('File', fileSchema);

export default File;
