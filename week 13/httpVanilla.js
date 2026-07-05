import http, { STATUS_CODES } from "http"

// 1.
// const server = http.createServer((req, res) => {
//     if (req.url === "/Morning") {
//         res.end("good Morning")
//     } else if (req.url === "/Evening") {
//         res.end("Good Evening")
//     }
// })

// server.listen(3000, () => {
//     console.log("Hello from my server")
// })

// 2.
// const server = http.createServer((req,res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     if (req.url === "/") {
//         res.end("Home Page")
//     } else if (req.url === "/about") {
//         res.end("About Page")
//     } else if (req.url === "/contact") {
//         res.end("Contact Page")

//     }else {
//         res.statusCode = 404
//         res.end("page not found")
        
//     }
// })

// server.listen(3000, () => {
//     console.log("Hello from my server")
// })

3.
const server = http.createServer((req, res) => {
    if (req.url === "/users") {
        if (req.method === "GET") {
            res.end("users list")
        } else if (req.method === "POST") {
            res.end("user created")
        } else {
            res.end("method not allowed")
        }
    } else {
        res.statusCode = 404
    }
})

server.listen(3000, () => {
    console.log("Hello from my server")
})