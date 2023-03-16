const sql = 'CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY, product_name TEXT, price INTEGER, total INTEGER)';

function createProductsTable(db) {
   db.run(sql) 

}
module.exports = { createProductsTable }



// app.get('/', (req, res) => {
//     db.all('SELECT * FROM products', [], (err, data)=>{
//       res.send(data)
//     })
//   })
//   app.get('/product/:id', (req, res) => {
//       const id= req.params.id
//       db.get('SELECT * FROM products WHERE id=?', [id], (err, data)=>{
//         res.send(data)
//       })
//     });
//     app.post("/new", (req, res)=>{
//       db.run('INSERT INTO products (image, name, price, total) values (?,?,?,?)', 
//       [req.body.image, req.body.name, req.body.price, req.body.total], (err)=> {
//           res.send('OK')
//       })
//     })
  
//     app.put("/update/:id", (req, res)=>{
//       const id= req.params.id
//       db.run('UPDATE products SET image=?, name=?, price=?, total=? WHERE id=?', 
//       [req.body.image, req.body.name, req.body.price, req.body.total, id], (err)=> {
//           res.send('OK')
//       })
//     })
    
//     app.delete("/delete/:id", (req, res)=>{
//       const id= req.params.id
//       db.run('DELETE FROM products  WHERE id=?', 
//       [id], (err)=> {
//           res.send('OK')
//       })
//     })
// }