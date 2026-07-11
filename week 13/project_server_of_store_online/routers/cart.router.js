import express from 'express'
import { readFiles, writeFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const file = 'products.json'
const file2 = 'customer.json'
const fullPath = path.join(folder, file)
const fullPath2 = path.join(folder, file2)

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await readFiles(fullPath2)
        const customerID = req.query.customerId
        
        if (!customerID) {
            return res.status(400).json({
                success: false, message: "Missing customerId"
            })
        }
        
        for (const customer of data) {
            if (customer.customerId == customerID) {
                const cart = customer.cart
                return res.status(200).json({
                    success: true, data: cart
                })
            }
        }
        
        return res.status(404).json({
            success: false, message: "Customer not found"
        })
    } catch (error) {
        res.status(400).json({
            success: false, message: error.message
        })
    }
})

router.post('/items', async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body
        
        if (!customerId || !productId || !quantity) {
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
        const dataCustomer = await readFiles(fullPath2)
        
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
        
        const customer = dataCustomer.find((c) => c.customerId == customerId)
        if (!customer) {
            return res.status(404).json({
                success: false, message: 'Customer not found'
            })
        }
        
        const existingItem = customer.cart.find((item) => item.productId == productId)
        
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            customer.cart.push({ productId, quantity })
        }
        
        await writeFiles(fullPath2, dataCustomer)
        
        return res.status(200).json({
            success: true, 
            data: customer.cart
        })

    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message
        })
    }
})

export default router;