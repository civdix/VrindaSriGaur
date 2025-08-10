import mongoose from 'mongoose';

const poetrySchema = new mongoose.Schema({
    title: {
        type: String,
        default: "No Title"
    },
    img_url: {
        type: String,
    },
    poetry: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        defualt:"Anonymouse"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    timestamp: {
        type: String,
        default: JSON.stringify(Date.now),
    },
    link: {
        type: String,
    },
    caption: {
        type: String
    }
});

export default mongoose.models.Poetry ||
  mongoose.model('Poetry', poetrySchema);
