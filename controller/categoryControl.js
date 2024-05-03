import categoryModel from "../Model/categoryModel.js"

const createCategory= async (req,res)=>{
  //console.log("post api")
  try {
    const {type} =req.body
   
    if(!type){
      return res.send({type:"plz enter name"})
    }
    
   
  //  it use to store the data to database ands save it .
  const user=await new categoryModel({type}).save()

    res.status(200).send(
      {
        success:true,
        message:"category created successfully",
        user
      }
    )
    
  }catch (error) {
    res.status(500).send(
      {
        success:false,
        message:"category not added"
      }
    )
  }
}

export default createCategory