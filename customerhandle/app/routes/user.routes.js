var express = require('express');
const router = express.Router();

const user = require('../controller/user.controller.js');

router.post('/login', user.userLogin); 

router.post('/register', user.userRegister);

router.post('/order', user.orderPlaced);

router.post('/update', user.orderUpdate);

router.post('/adminRegister', user.adminRegister);

router.post('/adminOrder', user.adminOrder);

module.exports = router;