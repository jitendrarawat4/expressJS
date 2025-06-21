const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController1');


router.get('/', userController.getAllUsers);
router.get('/sorting', userController.getAllUsersWithSorting);
