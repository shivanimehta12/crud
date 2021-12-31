const Router = require("express").Router();
const {
   addToWishlist
} = require("../controllers/wishlist.controller");

Router.get("/addwish" ,addToWishlist);

module.exports = Router;