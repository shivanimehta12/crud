const { string, object } = require('joi');
const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    name: String,
    description: String,
    author : String,
    cloudinary_id: {
        type: String,
      },
    images: String,
    owner_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    is_BookSold :{ type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);