const Router= require('express').Router;
const UserController = require('../controller/user_controller')
const router = new Router();
const {authenticateToken} = require('../middleware/authenticateToken')

router.get('/', UserController.all);
router.get('/:id', UserController.all);
router.post('/register', UserController.register ); 
router.post('/login', UserController.login ); 

router.post('/addproduct',authenticateToken, UserController.addproduct);
router.post('/delete', authenticateToken, UserController.delete)
router.post('/update', authenticateToken, UserController.update)

module.exports = router;