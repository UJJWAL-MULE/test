import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

const connect_db = async()=>{



  try{
    const con = await mongoose.connect(`${process.env.Mongo_url}?retryWrites=true&w=majority`,{useNewUrlParser:true , useUnifiedTopology:true})
    console.log("you have connected successfully".bgGreen.white)
  }
  catch (error) {
    console.log(`error during connecting to database and error is ${error}`.bgRed )
  }
}

export default connect_db
