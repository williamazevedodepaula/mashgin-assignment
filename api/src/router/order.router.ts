import { Request, Response } from 'express';
import { ApplicationException, ValidationException } from '../exception';
import { controllersModule } from '../module/controllers.module';

const express = require('express');
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log('---> 2')
  res.setHeader('Content-Type', 'application/json');//@TODO check availability of using middleware
  res.setHeader('Access-Control-Allow-Origin', '*');//@TODO check availability of using middleware
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS',);//@TODO check availability of using middleware
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);//@TODO check availability of using middleware
  try {
    res.send(
      await controllersModule.orderController.createNewOrder(req.body)
    )
  } catch (error) {
    handleHttpError(error as Error,res);
  }
}).get('/', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');//@TODO check availability of using middleware
  try {
    res.send(
      await controllersModule.orderController.listOrders()
    )
  } catch (error) {
    handleHttpError(error as Error,res);
  }
}).options('/', async (req: Request, res: Response) => {
  console.log('---> 1');
  res.setHeader('Access-Control-Allow-Origin', '*');//@TODO check availability of using middleware
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS',);//@TODO check availability of using middleware
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);//@TODO check availability of using middleware
  res.send({});
})


function handleHttpError(error:Error, res: Response) {
  let errorCode = 500;
  let errorBody = {
    message: `An unknown error has occurried in the server`
  }

  if (error instanceof ValidationException) {
    errorCode = 422;
    errorBody = {
      ...error,
      message: error.message
    };
  }

  if (error instanceof ApplicationException) {
    errorCode = 400;
    errorBody = {
      ...error,
      message: error.message
    };
  }

  res.status(errorCode);
  res.send(errorBody)
}

module.exports = router;