import express from 'express'
import { configDotenv } from 'dotenv'
import routerUsers from './routes/usersRoutes.js'
import {connectMongo} from './config/dbUsers.js'

configDotenv()

function errorHandler(err, req, res, next) {
    console.error(err.stack)
    if (err.status) {
        return res.status(err.statusCode).json({succses: false, message: err.errorMsg})
    }
    res.status(500).json({succses: false, message: "internal server error"})
}

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use('/users', routerUsers)

app.use('/', errorHandler)
    
app.listen(PORT, () => console.log("server is running..."))
