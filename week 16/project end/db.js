import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI)

export async function connectMongo() {
    try {
        await client.connect()
        console.log("client is connected")
        const db = await client.db("students")
        return db
    } catch (error) {
        console.log("error with connect", error)
    }
}

