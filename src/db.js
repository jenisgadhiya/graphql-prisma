let users = [{
    id: "1",
    name: "jenis",
    email: "jenis@test.com",
    age: 21
}, {
    id: "2",
    name: "smit",
    email: "smit@test.com",
    age: 24
}
    , {
    id: "3",
    name: "rahul",
    email: "rahul@test.com",
    age: 19
}]

let posts = [{
    id: "1",
    title: "graphQL",
    body: "learning graphql from andrew mead",
    published: false,
    autherId: "1"
}, {
    id: "2",
    title: "node",
    body: "learning node from andrew mead",
    published: true,
    autherId: "1"
}, {
    id: "3",
    title: "react",
    body: "learning react from andrew mead",
    published: false,
    autherId: "2"
},]

let comments = [{
    id: "1",
    text: "react is good",
    autherId: "3",
    postId: "3"
}, {
    id: "2",
    text: "graphql is query language",
    autherId: "1",
    postId: "1"
}, {
    id: "3",
    text: "node is best",
    autherId: "2",
    postId: "2"
}, {
    id: "4",
    text: "node is backend",
    autherId: "3",
    postId: "2"
}]

const db={
    users,
    posts,
    comments
}

export default db