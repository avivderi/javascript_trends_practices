import express from 'express'
import { readFiles, writeFiles } from "../utils/readAndWriteFiles.js";
import path from 'path'

const folder = 'data'
const file = 'products.json'
const fillPath = path.join(folder, file)

const router = express.Router();

router.get("/", async (req,res) => {
    try {
    const { inStock, maxPrice, search } = req.query
    let data = await readFiles(fillPath)
    if (inStock) {
        data = data.filter((product) => product.stock > 0)
    }
    if (maxPrice) {
        data = data.filter((product) => product.price <= maxPrice)
    }
    if (search) {
        data = data.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    }
    res.status(200).json({
        success: true, data: {data}
    })
    } catch (error) {
        return {success: false, message: error.message}
    }
})



export default router;