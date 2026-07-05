import http from "http"

const server = http.createServer((req, res) => {
    if (req.url === "/users" && req.method === "GET") {
        res.end("this is a users")
    } else {
        res.end("not found")
    }
})

server.listen(3000, () => {
    console.log("server is runnig on port 3000")
})

