import mongoose from "mongoose";

const categorySchema= mongoose.Schema({
  type:{
    type:String
  }

},{timestamps:true})

export default mongoose.model('Category',categorySchema)