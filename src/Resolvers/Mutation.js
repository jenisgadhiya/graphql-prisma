import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getuserId from '../utils/getUserId'

const Mutation={
    async createUser(parent, args,{ prisma }, info) {
        const emailTaken=await prisma.exists.User({email:args.data.email})
        if(emailTaken){
            throw new Error('email already exist')
        }
        if(args.data.password.length<8){
            throw new Error('password must be 8 character or longer..')
        }
        const password=await bcrypt.hash(args.data.password,10)
        const userdata=Object.assign({},args.data)
        userdata.password=password
        const user=await prisma.mutation.createUser({data:userdata})
        return {
            user,
            token:jwt.sign({userId:user.id},"iamjenis")
        }

    },
    async loginUser(parent, args,{ prisma }, info){
        const user=await prisma.query.user({
            where:{
                email:args.data.email
            }
        })
        if(!user){
            throw new Error('Unable to login..')
        }

        const ismatch=await bcrypt.compare(args.data.password,user.password)
        if(!ismatch){
            throw new Error('Unable to login')
        }

        const token=await jwt.sign({userId:user.id},"iamjenis")
        return {
            user,
            token
        }
    },
    async createPost(parent, args,{ prisma,pubsub,request }, info) {
        const userId=getuserId(request)
        return prisma.mutation.createPost({
            data:{
                title:args.data.title,
                body:args.data.body,
                published:args.data.published,
                auther:{
                    connect:{
                        id:userId
                    }                    
                }
            },
        },info)
    },
    async createComment(parent, args,{ prisma,pubsub }, info) {
        return prisma.mutation.createComment({
            data:{
                text:args.data.text,
                post:{
                    connect:{
                        id:args.data.postId
                    }
                },
                auther:{
                    connect:{
                        id:args.data.autherId
                    }
                }
            }
        },info)
    },
    async deleteUser(parent, args,{ prisma }, info) {
        const userExist=await prisma.exists.User({id:args.id})
        if(!userExist){
            throw new Error('User not found')
        }
        return prisma.mutation.deleteUser({where:{id:args.id}},info)
    },
    async deletePost(parent, args,{ prisma,pubsub }, info) {
        const postExist = await prisma.exists.Post({id:args.id})
        if (!postExist) {
            throw new Error('post not found')
        }
        return prisma.mutation.deletePost({
            where:{
                id:args.id
            }
        },info)
    },
    async deleteComment(parent, args,{ prisma,pubsub }, info) {
        const commentExist = await prisma.exists.Comment({id:args.id})
        if (!commentExist) {
            throw new Error('comment not found')
        }
        return prisma.mutation.deleteComment({
            where:{
                id:args.id
            }
        },info)
    },
    async updateUser(parent, args,{ prisma }, info){
        return prisma.mutation.updateUser({
            where:{
                id:args.id
            },
            data:args.data
        },info)
    },
    async updatePost(parent, args,{ prisma,pubsub }, info){
        return prisma.mutation.updatePost({
            data:args.data,
            where:{
                id:args.id
            }
        },info)
    },
    async updateComment(parent, args,{ prisma,pubsub }, info){
        return prisma.mutation.updateComment({
            where:{
                id:args.id
            },
            data:args.data
        ,info})
    }
}

export default Mutation