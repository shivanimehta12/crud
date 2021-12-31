const Router = require("express").Router();
const {
  addToCart
} = require("../controllers/cart.controller");
const Auth = require("../Helper/index");

Router.get("/add" ,Auth,addToCart);

module.exports = Router;