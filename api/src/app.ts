import { NextFunction, Request, Response } from 'express'

require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const app = express()

const port = process.env.BACKEND_PORT||3000;
const apiUrl = process.env.API_URL;


app.use(express.json())

app.use(function(req:Request, res:Response, next:NextFunction) {
  res.setHeader('AContent-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

//Load application routes
app.use('/menu',require('./router/menu.router'))
app.use('/orders',require('./router/order.router'))

//Create route for static files
app.use(express.static('/files'));

//Create route for documentation
const swaggerFile = require('./swagger.json')
//Configure URL in swagger to access the api in correct address
swaggerFile.servers[0].url = apiUrl;

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
