import { db } from "../db/db.js" 
import { ObjectId } from "mongodb"

const collection = db.collection('rounds')

export default {
    create: async (data) => {
        const result = await collection.insertOne({...data, status: 'IN-PROGRES', createdAt: new Date()})
        return result.insertedId
    },
    find: async (playerId) => {
        return await collection.find({playerId}).toArray()
    },
    update: async (roundId, data) => {
        const { _id, playerId, ...updateData } = data
        const result = await collection.updateOne(
            { _id: new ObjectId(roundId) },
            { $set: updateData }
        )
        return result.modifiedCount > 0
    }
}