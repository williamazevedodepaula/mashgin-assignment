import { Request, Response } from 'express'

const express = require('express')
const app = express()
const port = 3000


app.use(express.json())
app.use('/menu',require('./router/menu.router'))
app.use('/orders',require('./router/order.router'))
app.use(express.static('/files'));

app.get('/', (req:Request, res:Response) => {
  res.send(`
    <h1>Checkout Menu API!</h1>
    <ul>
      <li> Fetch menu: GET <a href="/menu">/menu</a></li>
      <li> Put order: POST /orders
      <li> List orders: GET <a href="/orders">/orders</a></li>
      <li> Fetch images: /images/:imageId
    </ul>
  `)
})

app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})
