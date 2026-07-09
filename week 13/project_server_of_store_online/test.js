import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    const name = 'Aviv';
    res.json({message: "hello " + name})
})

export default router