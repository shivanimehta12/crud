const Users = require("../models/user.model")
const Products = require("../models/books.model")
const Wishlist = require("../models/wishlist")

exports.addToWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.query;
        const check_user = await Users.find({ _id: user_id });
        const check_product = await Products.find({ _id: product_id });
         if (check_user.length > 0 && check_product.length > 0) {
            const wishlist = new Wishlist(req.query);
            const new_wishlist = await wishlist.save((err, wishlist) => {
                      if (err)
                        return res
                          .status(404)
                          .send({ data: "something went wrong", status: 404 });
                      return res
                        .status(201)
                        .send({ data: "item added successfully", status: 201 });
                    });
            // const populated = await Products.find({_id:product_id}).populate({path:"owner_id"})
            // return res.status(201).send({data:populated,status:201})
         }
         else {
               res.status(404).send({ data: "something went wrong...!", status: 504 });
            }
        //   const check_wishlist = await Wishlist.find({ _id: product_id });
          
        //   if (check_wishlist.length > 0) {
        //     res.status(201).send({ data: "item added successfully", status: 201 });
        //   } else {
        //     const wishlist = new Wishlist(req.query);
        //     const new_wishlist = await wishlist.save((err, wishlist) => {
        //       if (err)
        //         return res
        //           .status(404)
        //           .send({ data: "something went wrong", status: 404 });
        //       return res
        //         .status(201)
        //         .send({ data: "item added successfully", status: 201 });
        //     });
        //   }
        // } else {
        //   res.status(404).send({ data: "something went wrong", status: 404 });
        // }
      } catch (e) {
        res.status(501).send({ data: e, status: 501 });
      }
    };
