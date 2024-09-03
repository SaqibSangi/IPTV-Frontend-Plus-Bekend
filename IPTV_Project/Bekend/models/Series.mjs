import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  seasonsCount: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 10 },
});

const Series = mongoose.model('Series', seriesSchema);
export default Series;
