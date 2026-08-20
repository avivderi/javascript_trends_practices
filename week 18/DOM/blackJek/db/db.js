import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()
const URI = process.env.MONGO_URI
const dbName = process.env.NAME_DB
const client = new MongoClient(URI)
let dataBase;

async function conectedToMongoDB() {
    try {
        if (dataBase) return dataBase
        await client.connect()
        dataBase = client.db(dbName)
        console.log("mongodb is conected...")
        return dataBase
    } catch (error) {
        throw error
    }
}

export const db = await conectedToMongoDB()
