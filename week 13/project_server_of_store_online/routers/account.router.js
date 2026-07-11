import express from 'express'
import { readFiles, writeFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const file2 = 'customer.json'
const fullPath2 = path.join(folder, file2)

const STARTING_BALANCE = Number(process.env.STARTING_BALANCE) || 0

const router = express.Router()

router.get('/balance', async (req, res) => {
    try {
        const customerId = req.query.customerId

        if (!customerId) {
            return res.status(400).json({
                success: false, message: 'Missing customerId'
            })
        }

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

        return res.status(200).json({
            success: true,
            data: { customerId: customer.customerId, balance: customer.balance }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

export default router;
