import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  // ברגע שהבסיס נתונים קיים, מומלץ להגדיר אותו כאן:
  // database: "shop",
});

async function initDataBase() {
  try {
    await pool.execute("create database if not exists shop");
    await pool.execute("use shop");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

async function createTable() {
  try {
    // תיקון: נוספו פסיקים מפרידים ושונה crete ל-create
    await pool.execute(
      `create table if not exists products(
        id int primary key auto_increment,
        product_name varchar(50) not null,
        price decimal(10, 2) not null
      )`
    );
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

// אתחול ראשוני של הדאטהבייס והטבלה
await initDataBase();
await createTable();

// --- פעולות CRUD ---

/**
 * CREATE - יצירת מוצר חדש
 * @param {Object} product - { product_name, price }
 */
async function create(product) {
  const { product_name, price } = product;
  const [result] = await pool.execute(
    "insert into products (product_name, price) values (?, ?)",
    [product_name, price]
  );
  return { id: result.insertId, ...product };
}

/**
 * READ - חיפוש מוצרים לפי פילטר דינמי (או כל המוצרים)
 */
async function find(filter) {
  const query = filter
    ? "where " +
      Object.keys(filter)
        .map((key) => `${key}=? `)
        .join(" and ")
    : "";
  const values = filter ? Object.values(filter) : undefined;
  
  // תיקון: שליפת ה-rows בלבד מתוך ה-result
  const [rows] = await pool.execute(`select * from products ${query}`, values);
  return rows;
}

/**
 * READ - שליפת מוצר בודד לפי מזהה
 */
async function findById(id) {
  const rows = await find({ id });
  return rows.length ? rows[0] : null;
}

/**
 * UPDATE - עדכון מוצר קיים לפי מזהה
 * @param {number} id 
 * @param {Object} data - השדות לעדכון, למשל { price: 19.99 }
 */
async function update(id, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;

  const query = keys.map((key) => `${key}=?`).join(", ");
  const values = [...Object.values(data), id];

  await pool.execute(`update products set ${query} where id=?`, values);
  return findById(id); // מחזיר את המוצר המעודכן
}

/**
 * DELETE - מחיקת מוצר לפי מזהה
 */
async function deleteById(id) {
  const [result] = await pool.execute("delete from products where id=?", [id]);
  return result.affectedRows > 0; // מחזיר true אם נמחק בהצלחה, false אם לא נמצא
}

// ייצוא הפונקציות לשימוש בקבצים אחרים
export {
  pool,
  create,
  find,
  findById,
  update,
  deleteById
};