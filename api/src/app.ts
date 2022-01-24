import { Request, Response } from 'express'

// @TODO  read host and port from .env file
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

//Load application routes
app.use('/menu',require('./router/menu.router'))
app.use('/orders',require('./router/order.router'))

//Create route for static files
app.use(express.static('/files'));//@TODO handle errors to setup 'Content-Type', 'application/json' in header

//Create route for documentation
const swaggerFile = require('./swagger.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Create route for api 'homepage'
app.get('/', (req:Request, res:Response) => {
  res.send(`
    <h1>Checkout Menu API!</h1>

    <h4>To see the full docs, please <a href="/doc">click here to access Swagger!</a></h4>

    <h4>Menu</h4>
    <ul>
      <li> Fetch menu: GET <a href="/menu">/menu</a></li>
    </ul>
    <h4>Order</h4>
    <ul>
      <li> Put order: POST /orders
      <li> List orders: GET <a href="/orders">/orders</a></li>
    </ul>
    <h4>Image</h4>
    <ul>
      <li> Download images: /images/:imageId
    </ul>
  `)
})


//Start the server
app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})
