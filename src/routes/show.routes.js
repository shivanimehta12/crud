const Router = require("express").Router();
const {
    showbuylist,showishlist,booksold,getAllproductList
} = require("../controllers/showproduct");

Router.get("/show" ,showbuylist);
Router.get("/showwish",showishlist)
Router.get("/booksold",booksold)
Router.get("/searchFeild",( (req, res) => {
    let queryParams = req.query
   // let filters = req.body
    getAllproductList(queryParams,res).then((result) => {
        // console.log(result);
        res.send(result)
    }).catch((err) => {
        console.log("console", err)
        return res.status(501).send({ data: "internal server error", status: 509 });
    })
}))

module.exports = Router;