
import express from 'express'
import { error } from 'node:console'

const app = express()

app.use(express.urlencoded({extended: true}))

app.get("/register", (req, res) => {
    res.sendFile("HTMLfroms.html", {root: "./"})
})

app.post("/register", (req,res) => {
    const {username, email, password, age, role, TermsOfUse} = req.body
    console.log({username, email, password, age, role, TermsOfUse})
    if (!username || ! email) {
        return res.status(400).json({message: "name is not defined"})
    } return res.status(201).json({user: {username, email, password, age, role, TermsOfUse}, message: "ההרשמה הצליחה"})
})

app.listen(3000, () => console.log("the server is running..."))