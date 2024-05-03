import  express  from "express";
import dotenv from 'dotenv'
import colors from 'colors'
import connect_db from "./db.js";
import userRouter from "./Routes/userRouter.js";
import morgan from "morgan";
import itemsRoute from './Routes/itemsRoute.js'
import categoryRoute from './Routes/categoryRoute.js'
import cors from 'cors';


const app=express()

dotenv.config()

app.use(cors())

connect_db()

app.use(morgan('dev'))

app.use(express.json())

// app.use is use to set the middle ware  take 2 inputs path and function(req,res)  

//  use to creatre route for fetching opruploasding data to server
app.use('/api/user',userRouter)

app.use('/api/item',itemsRoute)

app.use('/api/category',categoryRoute)



app.get('/',(req,res)=>{
  res.send("welcome to index page")
})

const port = process.env.Port || 5200

app.listen(5200,()=>{
console.log(`you are running in port ${port} and Dev_Mode is ${process.env.Dev_Mode}`.bgCyan)
})
