import express from 'express'
import { readFiles, writeFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const fullPathProducts = path.join(folder, 'products.json')
const fullPathCustomers = path.join(folder, 'customer.json')
const fullPathOrders = path.join(folder, 'order.json')

const STARTING_BALANCE = Number(process.env.STARTING_BALANCE) || 0

const router = express.Router()

router.post('/checkout', async (req, res) => {
    try {
        const { customerId } = req.body

        if (!customerId) {
            return res.status(400).json({
                success: false, message: 'Missing customerId'
            })
        }

        const customers = await readFiles(fullPathCustomers)
        let customer = customers.find((c) => c.customerId == customerId)

        if (!customer) {
            customer = {
                customerId,
                balance: STARTING_BALANCE,
                cart: [],
                createdAt: new Date().toISOString()
            }
            customers.push(customer)
        }

        if (customer.cart.length === 0) {
            return res.status(400).json({
                success: false, message: 'Cart is empty'
            })
        }

        const products = await readFiles(fullPathProducts)

        const orderItems = []
        let total = 0

        for (const cartItem of customer.cart) {
            const product = products.find((p) => p.id == cartItem.productId)
            if (!product) {
                return res.status(400).json({
                    success: false, message: `Product ${cartItem.productId} no longer exists`
                })
            }
            if (product.stock < cartItem.quantity) {
                return res.status(400).json({
                    success: false, message: `Not enough stock for product ${product.id}`
                })
            }
            orderItems.push({
                productId: product.id,
                quantity: cartItem.quantity,
                price: product.price
            })
            total += product.price * cartItem.quantity
        }

        if (customer.balance < total) {
            return res.status(400).json({
                success: false, message: 'Insufficient balance'
            })
        }

        for (const item of orderItems) {
            const product = products.find((p) => p.id == item.productId)
            product.stock -= item.quantity
        }
        await writeFiles(fullPathProducts, products)

        customer.balance -= total
        customer.cart = []
        await writeFiles(fullPathCustomers, customers)

        const orders = await readFiles(fullPathOrders)
        const nextId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1
        const newOrder = {
            id: nextId,
            customerId,
            items: orderItems,
            total,
            createdAt: new Date().toISOString()
        }
        orders.push(newOrder)
        await writeFiles(fullPathOrders, orders)

        return res.status(200).json({ success: true, data: newOrder })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const customerId = req.query.customerId

        if (!customerId) {
            return res.status(400).json({
                success: false, message: 'Missing customerId'
            })
        }

        const orders = await readFiles(fullPathOrders)
        const customerOrders = orders.filter((o) => o.customerId == customerId)

        return res.status(200).json({ success: true, data: customerOrders })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

export default router;
