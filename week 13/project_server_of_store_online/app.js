import express from 'express'
import 'dotenv/config'
import productsRoutes from './routers/products.router.js'
import cartRouters from './routers/cart.router.js'

const server = express()

const PORT = process.env.PORT 

server.use(express.json())
server.use('/products', productsRoutes)
server.use('/cart', cartRouters)

server.get('/', (req, res) => {
    try {
    res.status(200).json({
        success: true,
        data: {message: "Welcome to the Nike Shoe Store API!"}
    })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

server.get('/health', (req, res) => {
    try {
    res.status(200).json({
        success: true,
        data: {message: "Server is healthy and running"}
    })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

server.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

server.listen(PORT, () => console.log('listening in server'))
