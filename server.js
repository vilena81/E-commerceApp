require('dotenv').config()
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const route = require('./routes/index')
const port = process.env.PORT || 3000
const db = new sqlite3.Database("data.db")
const carts_item = require('./model/carts_item')
const carts_model = require('./model/carts_model')
const products_model = require('./model/products_model')
const users_model = require('./model/users_model')
 
carts_item.createCartItemsTable(db)
carts_model.createCartsTabel(db)
products_model.createProductsTable(db)
users_model.createUsersTable(db)

app.use(express.json())
app.use('/', route)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})