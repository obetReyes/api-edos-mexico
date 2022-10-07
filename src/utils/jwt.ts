  import {sign} from "jsonwebtoken"

export const createToken = (user:any) => {
    const acess_token = sign({useremail:user.email, id:user.id}, "secretplschange",{
      algorithm: 'HS256'
    })
    return acess_token
}

