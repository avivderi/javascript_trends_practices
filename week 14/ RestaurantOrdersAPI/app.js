import express from 'express'

const server = express()
server.use(express.json())

server.listen(3000, (req, res) => {
    res.send('the server is running')
})