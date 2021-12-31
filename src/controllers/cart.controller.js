const User = require("../models/user.model");
const Product = require("../models/books.model");

exports.addToCart = async (req, res) => {
  console.log("sdjkfhjdshfj")
  try {
    const { user_id, product_id, } = req.query;
    console.log("mehta...!",user_id,product_id)
    const check_user = await User.find({ _id: user_id });
    console.log("shivani mehta....!")
    const check_product = await Product.find({ _id: product_id });
    if (check_user.length > 0 && check_product.length > 0) 
   {
     console.log("eeeeeeeeeeee",check_user[0].urs_role)
      if (check_user[0].urs_role === 'buyer')
      {
        const updation = await Product.findOneAndUpdate({_id:product_id},{is_BookSold:true,owner_id:user_id})
        const populated = await Product.find({_id:product_id}).populate({path:"owner_id"})
        return res.status(201).send({data:populated,status:201})
      }
      else{
        return  res.status(501).send({ data: "error", status: 501 });
      }
}
  }
catch (e) {
    console.log(e);
    res.status(501).send({ data: "error", status: 501 });
  }
}
