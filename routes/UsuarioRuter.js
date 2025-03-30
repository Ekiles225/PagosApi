import express from 'express';
import { getUser, getOneUser, createUsers, updateUsers,updateUserTelefono, updateUsersPassword, deleteUsers, login } from '../controller/userController.js';
import  {verifyToken}  from '../middleware/auth.js';

const router = express.Router();


router.get('/user',verifyToken, getUser);
router.get('/user/:id',verifyToken, getOneUser);
router.post('/register', createUsers);
router.put('/user/:id',verifyToken, updateUsers);
router.delete('/user/:id', verifyToken, deleteUsers);

router.post('/login', login);
router.put('/user/telefono/:id',verifyToken, updateUserTelefono);
router.put('/user/password/:id',verifyToken, updateUsersPassword);



export default router;