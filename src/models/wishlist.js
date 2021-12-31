const mongoose = require("mongoose")
const WishListSchema = new mongoose.Schema({
user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
product_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
},
});
const Wishlist = new mongoose.model('Wishlist', WishListSchema);
module.exports = Wishlist