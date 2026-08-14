import express from 'express'
import { nextTick } from 'node:process'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.get('/api/products', (req, res) => {
    return res.json([{
        id: 1,
        name: 'milk',
        price: 7.5,
        category: "Dairy products"
    },
    {
        id: 2,
        name: 'cheese',
        price: 9.5,
        category: "Dairy products"
    },
    {
        id: 3,
        name: 'Delicacies',
        price: 16.9,
        category: "Dairy products"
    },
    ])
})

app.listen(3000, () => console.log('the server is running...'))