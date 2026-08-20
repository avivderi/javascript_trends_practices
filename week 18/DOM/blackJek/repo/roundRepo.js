import { db } from "../db/db.js" 

const collection = db.collection('rounds')

export default {
    create: async (data) => {
        const result = await collection.insertOne({...data, status: 'IN-PROGRES', createdAt: new Date()})
        return result.insertedId
    },
    find: async (playerId) => {
        return await collection.find({playerId}).toArray()
    },
    update: async (playerId, data) => {
        const result = await collection.updateOne({playerId: playerId}, {$set: data})
        return result.modifiedCount > 0
    }
}