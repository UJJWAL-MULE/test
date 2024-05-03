import express  from "express";
import {createItem,getItem} from "../controller/itemController.js"

const router=express.Router()

router.post('/items',createItem)
router.get('/getItems',getItem)

export default router