import express from 'express'
import 'dotenv/config'
import productsRoutes from './routers/products.router.js'
import cartRouters from './routers/cart.router.js'
import accountRoutes from './routers/account.router.js'
import ordersRoutes from './routers/orders.router.js'

const server = express()

const PORT = process.env.PORT || 3000

server.use(express.json())

server.use((error, req, res, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        return res.status(400).json({ success: false, message: 'Invalid JSON body' })
    }
    next(error)
})

server.use('/products', productsRoutes)
server.use('/cart', cartRouters)
server.use('/account', accountRoutes)
server.use('/orders', ordersRoutes)

server.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: { message: 'Welcome to the Nike Shoe Store API!' }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

server.get('/health', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: { message: 'Server is healthy and running' }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

server.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

server.use((error, req, res, next) => {
    res.status(500).json({ success: false, message: error.message })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
