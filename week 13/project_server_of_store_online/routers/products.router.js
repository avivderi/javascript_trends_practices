import express from 'express'
import { readFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const file = 'products.json'
const fullPath = path.join(folder, file)

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { inStock, maxPrice, search } = req.query
        let data = await readFiles(fullPath)

        if (inStock === 'true') {
            data = data.filter((product) => product.stock > 0)
        }
        if (maxPrice) {
            data = data.filter((product) => product.price <= Number(maxPrice))
        }
        if (search) {
            data = data.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
        }

        res.status(200).json({
            success: true, data
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

export default router;
