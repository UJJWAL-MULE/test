import  express  from "express";
import  register, { allUser, delete_data, login_user, protected_Route, singleUSer, updata }  from "../controller/userControl.js";
import { SignIn, isAdmin } from "../middleware/adminMiddleware.js";



const router=express.Router()

router.post('/register',register)

router.post('/login/',login_user)

router.get('/alldata',allUser)

router.get('/singleUSer/:id',singleUSer)

router.put('/updateUser/:id',updata)

router.delete('/delete_userdata/:id',delete_data)

router.get('/test',SignIn,protected_Route)

export default router


