const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },  // Ensure cover is a valid file path
    createdAt: { type: Date, default: Date.now },  // Auto-generate the date
    author:{type:Schema.Types.ObjectId,ref:'User'},
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
