const Users = require("../models/user.model")
const Products = require("../models/books.model")
const Wishlist = require("../models/wishlist")
//const product = new BaseDao(Products)
exports.showbuylist = async (req, res) => {
    try {
        const { user_id } = req.query;
        const check_user = await Users.find({ _id: user_id });
         if (check_user.length > 0) {
            
            const populated = await Products.find({owner_id:user_id})

             return res.status(201).send({data:populated,status:201})
         }
         else {
               res.status(404).send({ data: "something went wrong...!", status: 504 });
            }
        
      } catch (e) {
        res.status(501).send({ data: e, status: 501 });
      }
    };

    // show wishlist........!// if (Products.===true)
            // {
              
            //   const populated = await Products.find({owner_id:user_id})
            //   return res.status(201).send({data:populated,status:201})
            // }
            // else{
            // }
           // return  res.status(501).send({ data: "error", status: 501 });

    exports.showishlist = async (req, res) => {
      try {
          const { user_id } = req.query;
          const check_user = await Users.find({ _id: user_id });
          //const check_product = await Products.find({ _id: product_id });
           if (check_user.length > 0 ) {
            // const wishlist = new Wishlist(req.query);
              const populated = await Wishlist.find({user_id:user_id}).populate({path:'product_id',select:['author','is_BookSold','']})
  
               return res.status(201).send({data:populated,status:201})
           }
           else {
                 res.status(404).send({ data: "something went wrong...!", status: 504 });
              }
          
        } catch (e) {
          res.status(501).send({ data: e, status: 501 });
        }
      };
  
      // book sold
      exports.booksold = async (req, res) => {
        try {
          const { user_id, } = req.query;
       
         const check_user = await Users.find({ _id: user_id });
        //  const check_product = await Products.find({ _id: product_id });
       if (check_user.length > 0 ) 
         {

         // const book = await Products.find({is_BookSold:true}).populate({path:"owner_id"})
        const populated = await Products.find({owner_id:user_id,is_BookSold:true})
          console.log(populated)

          return res.status(200).send({data:populated})
           

      }
        }
      catch (e) {
          console.log(e);
          res.status(501).send({ data: "error", status: 502 });
        }
      }


      // searching......!
      exports.getAllproductList = async(queryParams,res) =>{
        try {
           const aggregateQuery = [];
         //new one
        // let aggregateQuery = [];
         if (queryParams.searchFeild) {
          aggregateQuery.push({
                 $match: {
                     $or: [
                         { "name": queryParams.searchFeild },
                         { "author": queryParams. searchFeild},
                         { "description": queryParams.searchFeild },
                         
     
                     ]
                 }
             })
         }
         //end
          
        //    aggregateQuery.push(
        //          { $sort : { 'createdAt' : -1} }
        //      )
        //    if(queryParams && queryParams.name && queryParams.name!=='') {
        //     aggregateQuery.push({
        //       "$match": {
        //           "name": { "$regex": queryParams.name, "$options": "i" }  
        //       }
        //   })
        //    }
           
           
        //    if(queryParams && queryParams.author) {
        //        aggregateQuery.push({
        //            "$match": {
        //                "author": { "$regex": queryParams.author, "$options": "i" }  
        //            }
        //        })
        //    }
        //    if(queryParams && queryParams.description) {
        //     aggregateQuery.push({
        //         "$match": {
        //             "description": { "$regex": queryParams.description, "$options": "i" }  
        //         }
        //     })
        // }
        //   //  console.log(queryParams);
          //  aggregateQuery.push({
          //      $skip: Number(queryParams.skip) * parseInt(queryParams.limit)
          //  }, {
          //      $limit: parseInt(queryParams.limit)
          //  })
           console.log("shivani",JSON.stringify(aggregateQuery))
           const result = await Products.aggregate(aggregateQuery)
           if (result) {
               let respObj = {
                   //"recordsTotal": productCount,
                   "recordsFiltered": result.length,
                   "records": result
               }
               console.log(result)
               return res.status(501).send({ data: result, status: 504 });
           } else {
               return res.status(501).send({ data: "error", status: 503 });
           }
        } catch(err) {  
          console.log(err)
          return res.status(501).send({ data: "error", status: 502 });
        }
    }



  