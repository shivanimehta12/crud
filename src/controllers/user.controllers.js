const User = require('../models/user.model.js');
const jwt = require ('jsonwebtoken')
require("dotenv").config();


// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
User.find()
  .then(users => {
  res.send(users);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of users."
});
});
};
// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new User
const user = new User({
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  username : req.body.username ,
  email: req.body.email,
  phone: req.body.phone,
  password:req.body.password,
  urs_role : req.body.urs_role,
 // image:req.body.image
});
// Save user in the database
user.save()
  .then(data => {
    const token = jwt.sign({ user_id: user._id }, JWT, {
      expiresIn: "1d",
    });
  res.send({data:data,token,token});
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new user."
});
});
};
// Find a single User with a id
exports.findOne = (req, res) => {
 User.findById(req.params.id)
  .then(user => {
  if(!user) {
   return res.status(404).send({
   message: "User not found with id " + req.params.id
 });
}
 res.send(user);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "User not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting user with id " + req.params.id
});
});
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Find user and update it with the request body
User.findByIdAndUpdate(req.params.id, {
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  phone: req.body.phone,
  urs_role : req.body.urs_role,
  //image:req.body.image
}, {new: true})
.then(user => {
 if(!user) {
   return res.status(404).send({
   message: "user not found with id " + req.params.id
 });
}
res.send(user);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating user with id " + req.params.id
});
});
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
User.findByIdAndRemove(req.params.id)
.then(user => {
if(!user) {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
res.send({message: "user deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete user with id " + req.params.id
});
});
};

//login

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  console.log(user)
  const token = jwt.sign({ user_id: user._id, email }, process.env.JWT, {
    expiresIn: "2h",
  });
  return res.send(token);

  if (!user) {
      //console.log("123")
      return 1;
  } else {
      //console.log('wait')
      if(password == user.password) {
      
          try{
            console.log(user)
            const token = jwt.sign({ email:email }, JWT, {expiresIn: "2h"});
              return res.send(token);
          }catch(err){
              console.log(err);
          }
           
      }
  else{
      console.log('wait1 2')
      return 1;
  }
  }
}
// token
exports.registerToken = async (req, res) => {
  console.log(req.body.token);
  tokens.push(req.body.token);
  res.status(200).json({ data: "Successfully registered FCM Token!" });
};
// loggedout 

