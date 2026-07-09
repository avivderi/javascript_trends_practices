import express from 'express'
import { readFiles, writeFiles } from "./readAndWriteFiles";

const router = express.Router();

router.get("/products", async (req,res) => {
    try {
    const data = await readFiles('../data/products.json')
    const sorted = data.filter((product) => product.stock > 0)
    } catch (error) {
        return {success: false, message: error.message}
    }
})



export default router;