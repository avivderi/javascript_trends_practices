import express from 'express'
import { configDotenv } from 'dotenv'

const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => console.log("server is running..."))