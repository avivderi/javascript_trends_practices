import express from 'express'
import {db} from '../config/dbUsers.js'
import { createUser,
        findById
        } from '../repository/userRepository.js'



const router = express.Router()

router.post('/', async (req, res, next) => {
    const {firstName, lastName, className} = req.body
    if (!firstName || !lastName || !className) {
        const error = new Error("Missing values ​​for user creation")
        error.statusCode = 400
        return next(error)
    }
    const labSessionsIds = []
    const result = await createUser({
        firstName,
        lastName,
        className,
        labSessionsIds
    })
    return res.status(201).json({id: result})
})

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    const user = await findById(userId)
    return res.status(200).json({success: true, data: user})
})

export default(router)