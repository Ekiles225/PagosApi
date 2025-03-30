import express from 'express';
import { updateUsers, changeImage} from '../controller/personController.js';
import  {verifyToken}  from '../middleware/auth.js';
import multer from 'multer';

// const uploadd = multer({ dest: 'public/imagenes/persona' });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imagenes/persona')
    },
    filename: function (req, file, cb) {
       const { id } = req.params;
        cb(null,  id + "-" + file.originalname );
    }
  });
var upload = multer({ storage: storage });
const rotuer = express.Router();

rotuer.put('/person/:id',verifyToken, updateUsers);
rotuer.put('/update/image/:id', upload.single("file"), changeImage);

export default rotuer;