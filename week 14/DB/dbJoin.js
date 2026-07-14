import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root"
})

async function createTable() {
    try {
        await pool.execute(`CREATE database if not exists my_db_name`)
        await pool.execute(`use my_db_name`)

        await pool.execute(`
            CREATE TABLE if not exists users(
            id INTEGER PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            city_id INTEGER);`
            );
        
        await pool.execute(`
            CREATE TABLE if not exists orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            product VARCHAR(30),
            amount  INTEGER);`
            );

        await pool.execute(`
            CREATE TABLE if not exists cities (
            id INTEGER PRIMARY KEY,
            city VARCHAR(30),
            country VARCHAR(30));`
        )
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}


async function insertTable() {
    try {
        await pool.execute(`use my_db_name`)
        await pool.execute(`
            INSERT IGNORE INTO users VALUES (
            1,'Alice',10),
            (2,'David',11),
            (3,'Sarah',10),
            (4,'Noa',12);
            `)

        await pool.execute(`
            INSERT IGNORE INTO orders VALUES (
            1,1,'MacBook',2500),
            (2,1,'Phone',900),
            (3,3,'Tablet',600),
            (4,3,'Keyboard',150);
            `)

        await pool.execute(`
            INSERT IGNORE INTO cities VALUES (
            10,'Tel Aviv','IL'),
            (11,'Jerusalem','IL'),
            (12,'Haifa','IL');
            `)
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

await createTable()
await insertTable()