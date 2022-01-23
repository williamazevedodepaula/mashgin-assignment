import { Request, Response } from 'express'

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req:Request, res:Response) => {
  res.send('Checkout Menu API!')
})

app.use(express.json())
app.use('/menu',require('./router/menu.router'))
app.use('/orders',require('./router/order.router'))
app.use(express.static('/files'));


app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})
