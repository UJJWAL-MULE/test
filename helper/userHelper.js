// const bcrypt=require('bcrypt')
import bcrypt from 'bcrypt'


export const hashPassword= async(password)=>{
try {
  const saltRound=10
  const hashPass=await bcrypt.hash(password,saltRound)
  return hashPass  

} catch (error) {
 console.log('error occured is '+error) 
}
}

export const comparePssword=async(password,hashpass)=>{
  return bcrypt.compare(password,hashpass)
}