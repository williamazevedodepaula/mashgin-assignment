import { Request, Response } from 'express'

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req:Request, res:Response) => {
  res.send('Checkout Menu API!')
})

app.use('/menu',require('./router/menu.router'))


app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})
