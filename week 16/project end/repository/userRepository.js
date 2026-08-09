import {db} from '../config/dbUsers.js'

export async function createUser(data) {
    const result = await db.insertOne(data)
    return result.insertedId
}

export async function findById(userId) {

    const user = await db.findOne({id: userId})
    if (!user) {
        const error = new Error("user id not found")
        error.statusCode = 404
        throw error
    }
    return user
}