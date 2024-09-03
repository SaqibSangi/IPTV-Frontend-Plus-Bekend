import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
    // Additional fields as needed
});

const Episode = mongoose.model('Episode', episodeSchema);
export default Episode;
