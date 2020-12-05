import jwt from 'jsonwebtoken'

const getuserId=(req)=>{
    const header=req.request.headers.authorization
    if(!header){
        throw new Error('Authentication Required')
    }
    const token=header.replace("Bearer ","")
    const decode=jwt.verify(token,"iamjenis")
    return decode.userId
}

export default getuserId