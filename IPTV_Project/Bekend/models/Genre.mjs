import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parent: { type: String, default: '' },
  color: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

const Genre = mongoose.model('Genre', genreSchema);
export default Genre;
