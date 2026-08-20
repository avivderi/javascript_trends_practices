import { ObjectId } from "mongodb"
import { db } from "../db/db.js" 

const collection = db.collection('players')

export default {
    create: async () => {
        const result = await collection.insertOne({chips: 1000, createdAt: new Date()})
        return result.insertedId
    },
    find: async (id) => {
        return await collection.findOne({_id: new ObjectId(id)})
    },
    updateChips: async (id, newAmount) => {
        const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: {chips: newAmount}})
        return result.modifiedCount > 0
    }
}

