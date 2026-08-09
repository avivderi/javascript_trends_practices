import express from 'express'

const app = express()

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "./"})
})

app.post("/contact", async (req, res) => {
    
})

app.listen(3333 , () => {
    console.log("the server is running...")
})