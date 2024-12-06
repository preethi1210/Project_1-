const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true,  // Corrected option name
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
