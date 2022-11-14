  import {sign} from "jsonwebtoken"
  import * as dotenv from 'dotenv' 
dotenv.config()
  
const secret:string = process.env.SECRET_JWT ?? ""
export const createToken = (user:any) => {
    const acess_token = sign({useremail:user.email, id:user.id}, secret,{
      algorithm: 'HS256'
    })
    return acess_token
}

