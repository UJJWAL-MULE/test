import itemModel from "../Model/itemModel.js"

 const createItem = async (req,res)=>{
  //console.log("post api")
  try {
    const {name,description,type} =req.body
   
    if(!name){
      return res.send({name:"plz enter name"})
    }
    
    if(!description){
      return res.send({description:"description is Required"})
  }
  if(!type){
      return res.send({type:"type is Required"})
  }
 
  //  it use to store the data to database ands save it .
  const items=await new itemModel({name,description,type}).save()

    res.status(200).send(
      {
        success:true,
        message:"user created successfully",
        items
      }
    )
    
  }catch (error) {
    res.status(500).send(
      {
        success:false,
        message:"items not added"
      }
    )
  }

}



// export const getItem= async(req,res)=>{

//   try { 
//     const data = await itemModel.find().populate('type')
//     console.log(data)
//     res.status(200).send({
//       success:true,
//       message:"data got successfully",
//       data
//     })

//   } catch (error) {
   
//     res.status(200).send({
//       success:false,
//       message:"data  not loaded"  
//     })
//   }
// }
// export default createItem


 const getItem=async(req,res)=>{

  try {
   const all_Items= await itemModel.find().populate('type')
   res.status(200).send({
     success:true,
     message:"all data got",
     all_Items
       })
  } catch (error) {
   res.status(500).send({
     success:false,
     message:"not able to fetch data"
   })
  }
 }
 export  {getItem,createItem}

