const sql = `CREATE TABLE IF NOT EXISTS products
 (product_id INTEGER PRIMARY KEY, 
   product_name TEXT,
   price INTEGER, 
   total INTEGER)`;

function createProductsTable(db) {
   db.run(sql)

}
module.exports = { createProductsTable }


