import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";

configDotenv()

const client = new MongoClient(process.env.MONGO_URI)

export async function connectMongo() {
    try {
        await client.connect()
        console.log("client is connected")
        const db = client.db("students")

        await db.createCollection("students", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Student Object Validation",
                    required: ["id", "firstName", "lastName", "className", "labSessionsIds"],
                    properties: {
                        id: {
                        bsonType: "string"
                        },
                        firstName: {
                        bsonType: "string"
                        },
                        lastName: {
                        bsonType: "string"
                        },
                        className: {
                        bsonType: "string"
                        },
                        labSessionsIds: {
                        bsonType: "array",
                        items: {bsonType: "string"}
                        }
                    }
                }
            }
            } )


        return db
    } catch (error) {
        console.log("error with connect", error)
    }
}

export const db = connectMongo()