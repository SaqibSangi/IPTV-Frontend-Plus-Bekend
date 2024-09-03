import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
    url: { type: String, required: true },
    episode: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Additional fields as needed
});

const Stream = mongoose.model('Stream', streamSchema);
export default Stream;
