const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');
const validate = require('../controllers/userValidation');

// Retrieve all users
router.get('/', userController.findAll);

// Create a new user
router.post('/create', validate,userController.create);

// Retrieve a single user with id
router.get('/:id',userController.findOne);

// Update a user with id
router.put('/:id', validate,userController.update);

// Delete a user with id
router.delete('/:id', userController.delete);

//login
router.post('/login',userController.login,[validate]);
router.post("/regtoken", userController.registerToken);
module.exports = router