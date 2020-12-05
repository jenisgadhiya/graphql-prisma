import {Prisma} from 'prisma-binding'

const prisma=new Prisma({
    typeDefs:'src/generated/prisma.graphql',
    endpoint:'http://localhost:4466',
    secret:"thisissecret"

})

export default prisma


// prisma.query.users(null,'{id name posts {id title comments {id text}} email}').then((data)=>{
//     console.log(JSON.stringify(data,undefined,2))
// })

// prisma.exists.User({
//     id:"ckgkp7qnf00ak0701f6aw649"
// }).then((data)=>{
//     console.log(data)
// })

//
// prisma.mutation.createPost({
//     data:{
//         title:"post title 2",
//         body:"post body 2",
//         published:true,
//         auther:{
//             connect:{
//                     id:"ckgkp7qnf00ak0701f86aw649"
//                 }
//             }
//         }
// },'{id title body published}').then((data)=>{
//     console.log(JSON.stringify(data,undefined,2))
// })


