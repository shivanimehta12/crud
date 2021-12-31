const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.routes')
const bookRoutes = require('./src/routes/book.routes')
const cartRoutes = require('./src/routes/cart.routes')
const fileupload = require('express-fileupload')
require("dotenv").config();
var multer = require('multer');
const fs = require('fs');
const upload = require('./src/utils/multer')
const wishRoutes = require('./src/routes/wishlist.routes')
const showbuy=require('./src/routes/show.routes')

//var upload = multer({dest:'uploads/'});
//var upload = multer({ storage: storage })

const cloudinary = require('./src/utils/cloudinary')
// create express app
const app = express();
// create fileapp 
// app.use(fileupload({
//  useTempFiles : true
//  }));
// Setup server port
// cloudinary ....!
/*cloudinary.config({
  cloud_name :'shivicloudinary',
  api_key :'483474487216254',
  api_secret :'kth4rHZcjth-eBdOg4oPq34-OUs'})*/
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
// Connecting to the database
mongoose.connect(dbConfig.url, {
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
// define a root/default route
app.get('/', (req, res) => {
   res.json({"message": "Hello World"});
});
// listen for requests
app.listen(port, () => {
   console.log(`Node server is listening on port ${port}`);
});
// using as middleware
app.use('/api/users', userRoutes)
app.use('/api/books',bookRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/wish',wishRoutes)
app.use('/api/showbuy',showbuy)


 //file upload api
   app.use("/upload", upload.array('image'),async (req, res, next)=>{ 
    //new one
    console.log("Hio",req.files)
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
  
      res.status(200).json({
        message: 'images uploaded successfully',
        data: urls
      })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  //  cloudinary.uploader.upload(file.tempFilePath,
  //   function(err,result){
  //     res.send({
  //       success:true,
  //       result
  //     })
  //   });
  });
//   file.mv('./img_uploads/'+file.name,function(err,result){ 

//       if(err)
//       throw err;
//       res.send({
//           success: true,
//           message: "file uploaded" 
//        });
//   } );
// } );

// multer......!
// app.post('/single', upload.single('profile'), (req, res) => {
//   try {
//     res.send(req.file);
//   }catch(err) {
//     res.send(400);
//   }
// });

// app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
//     try {
//         res.send(req.files);
//     } catch(error) {
//           console.log(error);
//            res.send(400);
//     }
// });




