import express from 'express'
import dotenv from 'dotenv/config'
import productsRoutes from './routers/products.router.js';


const server = express()

server.use('/products', productsRoutes);


const PORT = process.env.PORT 

server.listen(PORT, () => console.log('listening in server'))