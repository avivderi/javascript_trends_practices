import express from 'express'
import { readFiles, writeFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const file = 'products.json'
const file2 = 'customer.json'
const fullPath = path.join(folder, file)
const fullPath2 = path.join(folder, file2)

const STARTING_BALANCE = Number(process.env.STARTING_BALANCE) || 0

const router = express.Router()

async function getOrCreateCustomer(customerId) {
    const customers = await readFiles(fullPath2)
    let customer = customers.find((c) => c.customerId == customerId)

    if (!customer) {
        customer = {
            customerId,
            balance: STARTING_BALANCE,
            cart: [],
            createdAt: new Date().toISOString()
        }
        customers.push(customer)
        await writeFiles(fullPath2, customers)
    }

    return { customer, customers }
}

async function buildCartResponse(cart) {
    const products = await readFiles(fullPath)

    const items = cart.map((item) => {
        const product = products.find((p) => p.id == item.productId)
        const price = product ? product.price : 0
        return {
            productId: item.productId,
            name: product ? product.name : null,
            quantity: item.quantity,
            price,
            lineTotal: price * item.quantity
        }
    })

    const total = items.reduce((sum, item) => sum + item.lineTotal, 0)
    return { items, total }
}

router.get('/', async (req, res) => {
    try {
        const customerID = req.query.customerId

        if (!customerID) {
            return res.status(400).json({
                success: false, message: "Missing customerId"
            })
        }

        const { customer } = await getOrCreateCustomer(customerID)
        const cart = await buildCartResponse(customer.cart)

        return res.status(200).json({
            success: true, data: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        })
    }
})

router.post('/items', async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body

        if (!customerId || !productId || quantity === undefined) {
            return res.status(400).json({
                success: false, message: 'Missing mandatory values'
            })
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false, message: 'Quantity must be a positive integer'
            })
        }

        const dataProducts = await readFiles(fullPath)

        const findProduct = dataProducts.find((p) => p.id == productId)
        if (!findProduct) {
            return res.status(404).json({
                success: false, message: 'Product does not exist'
            })
        }
        if (findProduct.stock < quantity) {
            return res.status(400).json({
                success: false, message: 'Not enough in stock'
            })
        }

        const { customer, customers } = await getOrCreateCustomer(customerId)
        const existingItem = customer.cart.find((item) => item.productId == productId)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            customer.cart.push({ productId, quantity })
        }

        await writeFiles(fullPath2, customers)
        const cart = await buildCartResponse(customer.cart)

        return res.status(200).json({
            success: true,
            data: cart
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/items/:productId', async (req, res) => {
    try {
        const { productId } = req.params
        const { customerId } = req.body

        if (!customerId) {
            return res.status(400).json({
                success: false, message: 'Missing customerId'
            })
        }

        const { customer, customers } = await getOrCreateCustomer(customerId)
        const itemIndex = customer.cart.findIndex((item) => item.productId == productId)

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false, message: 'Product not in cart'
            })
        }

        customer.cart.splice(itemIndex, 1)
        await writeFiles(fullPath2, customers)
        const cart = await buildCartResponse(customer.cart)

        return res.status(200).json({
            success: true, data: cart
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: error.message
        })
    }
})

export default router;
