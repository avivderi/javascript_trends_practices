import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "my_db_name"
})

async function createTable() {
    try {
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

async function run() {
    await createTable();
    await insertTable();

    console.log("\n--- Showing Databases ---");
    const [databases] = await pool.execute("SHOW DATABASES");
    console.table(databases);

    console.log("\n--- Showing Tables in my_db_name ---");
    const [tables] = await pool.execute("SHOW TABLES");
    console.table(tables);

    console.log("\n====== TABLE: users ======");
    const [users] = await pool.execute("SELECT * FROM users");
    console.table(users);

    console.log("\n====== TABLE: orders ======");
    const [orders] = await pool.execute("SELECT * FROM orders");
    console.table(orders);

    console.log("\n====== TABLE: cities ======");
    const [cities] = await pool.execute("SELECT * FROM cities");
    console.table(cities);

    console.log("\nClosing connection pool...");
    await pool.end();
    console.log("Terminal is free! 👋");
}

run();