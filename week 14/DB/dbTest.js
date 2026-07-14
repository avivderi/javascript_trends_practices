import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root"
})

async function initDataBase() {
    try {
        await pool.execute("create database if not exists shop");
        await pool.execute("use shop");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
    
}

async function createTable() {
    try {
        await pool.execute(
            `create table if not exists products(
            id int primaty key auto_increment,
            product_name varchar(50) not null,
            price decimal(10, 2) not null
            )`
        )
    } catch (error) {
        console.error("Error creating table:" , error)
    }
}

await initDataBase()
await createTable()

async function create(product) {
    const {product_name, price} = product
}
