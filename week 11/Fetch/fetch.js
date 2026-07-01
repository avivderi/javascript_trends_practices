1.
fetch("https://jsonplaceholder.typicode.com/posts/1")
.then((responce) => responce.json())
.then((data) => console.log(data.title))
.fetch((err) => console.log(err))

2.
fetch("https://jsonplaceholder.typicode.com/notfound")
.then((responce) => {
    if(!responce.ok){
        throw Error(`status: ${responce.status} ${responce.statusText}`)
    }
    return responce.json()
})
.then((data) => console.log(data.title))
.catch((err) => console.log(err))

3.
fetch("https://jsonplaceholder.typicode.com/posts")
.then((responce) =>{
    if(!responce.ok){
        throw Error(`status: ${responce.status} ${responce.statusText}`)
    }
    return responce.json()
})
.then((data) => {
    const title = data.map(obj => obj.title)
    return title
})
.then((result) => console.log(result))
.catch((err) => console.log(err))

4.
fetch("https://jsonplaceholder.typicode.com/posts",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        title:"כותרת חדשה",
        body:"תוכן הפוסט",
        userId:1
})
})
.then((responce) =>{
    if(!responce.ok){
        throw Error(`status:${responce.status} ${responce.statusText}`)
    }
    return responce.json()
})
.then((data) => console.log(data))
.catch((err) => console.log(err))

5.
function getUserById(id){
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((responce) =>{
        if (!responce.ok){
            throw Error(`status:${responce.status} ${responce.statusText}`)
        }
        return responce.json()
    })
    .catch((err) => (err))
}
getUserById(1)
.then((data) => console.log(data))
.catch((err) => console.log("id not found",err))

6.
fetch("https://jsonplaceholder.typicode.com/posts/1")
.then((responce) =>{
    if (!responce.ok){
        throw Error(`status: ${responce.status} ${responce.statusText}`)
    }
    return responce.json()
})
.then((data) => {const user = data.userId;return{title:data.title,user:user}})
.then((obj) => console.log(`title:${obj.title}, user:${obj.user}`))
.catch((err) => console.log(err))

7.
Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    fetch("https://jsonplaceholder.typicode.com/posts/1"),
    fetch("https://jsonplaceholder.typicode.com/todos/1")    
])
.then((responces) =>{
    return Promise.all(responces.map((responce) =>{
    if(!responce.ok){
        throw Error(`status:${responce.status} ${responce.statusText}`)
    }
    return responce.json()
    
}))
})
.then((data) => console.log(data))
.catch((err) => console.log(err))