const CryptoJS = require('crypto-js');
const sqlite = require('sqlite3').verbose()
const generateAccessToken = require('../functions/generateAccessToken')
const {checkAdmin} = require ("../functions/checkAdmin")

const db = new sqlite.Database('data.db', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('OK')
    }
});

class UserController {
    async all(req, res, next) {
        db.all('SELECT * FROM products', [], (err, data) => {
            res.send(data)
        })

    }
    async register(req, res, next) {
        try {
            const user_name = req.body.user_name
            const password = req.body.password
            const hashed_password = CryptoJS.SHA256(password).toString();

            const sql = "INSERT INTO users (user_name, password, role) VALUES (?, ?, ?)"
            db.run(sql, [user_name, hashed_password, 1], function (err) {
                if (err) {
                    res.send(JSON.stringify({ status: "Error Registering" }))
                }
                res.send(JSON.stringify({ status: "User Created" }))
            })

        } catch (e) {
            res.send('ERROR')
        }
    }
    async login(req, res, next) {
        try {
            const user_name = req.body.user_name
            const password = req.body.password
            const hashed_password = CryptoJS.SHA256(password).toString();
           
            const sql = "SELECT * from users WHERE user_name = ?";
            db.get(sql, [user_name], function (err, row) {
                console.log(row);
                if (user_name == row.user_name && hashed_password == row.password) {
                    let token = generateAccessToken.generateAccessToken(user_name, row.role)
                    res.send(JSON.stringify({ status: "Logged in", jwt: token }));

                } else {
                    res.send(JSON.stringify({ status: "Wrong credentials" }));
                }
            })
        } catch (e) {
            res.send('ERROR')
        }
    }
    async addproduct(req, res, next) {
        try {
            if(checkAdmin(req, res)){
            const { product_name, price, total } = req.body
            db.run('INSERT INTO products (product_name, price, total) values (?,?,?)', [product_name, price, total], (err) => {
                if (err) {
                    res.send(err);
                    console.log("text")
                } else {
                    res.send("Posted")
                }
            })
        } else {
            res.send(JSON.stringify({ status: "Denied Access" }));
        }
    }
        catch (e) {
            res.send('ERROR')
        }
    }
    async update(req, res, next) {
        try {
            if(checkAdmin(req, res)){
            const {product_name, price, total, id} = req.body
            db.run('UPDATE products SET  product_name=?, price=?, total=? WHERE product_id=?',
                [product_name, price,total, id], (err) => {
                    res.send('OK')
                })
            } else {
                res.send(JSON.stringify({ status: "Denied Access" }));
            }
        } catch (e) {
            res.send('ERROR')
        }
    }
    async delete(req, res, next) {
        try {
            if(checkAdmin(req, res)){
            const id = req.body.id
            db.run('DELETE FROM products  WHERE product_id=?', [id], (err) => {
                res.send('OK')
            })
        } else {
            res.send(JSON.stringify({ status: "Denied Access" }));
        }
        } catch (e) {
            res.send('ERROR')

        
        }
    }

}

module.exports = new UserController()