import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    // Additional fields as needed
});

const Season = mongoose.model('Season', seasonSchema);
export default Season;
