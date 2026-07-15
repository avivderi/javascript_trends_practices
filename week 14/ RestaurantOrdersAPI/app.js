import express from 'express'
import router from './router'
import {logger, readFile} from './funcMiddelware.js'

const server = express()
server.use(express.json())

server.use(logger, readFile)

server.use('/order', router)

server.listen(3000, () => {
    console.log('the server is running')
})