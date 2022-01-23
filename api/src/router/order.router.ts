import { Request, Response } from 'express';
import { ValidationException } from '../exception';
import { controllersModule } from '../module/controllers.module';

const express = require('express');
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try{
    res.send(
      await controllersModule.orderController.createNewOrder(req.body)
    )
  }catch(error){
    if(error instanceof ValidationException){
      res.status(422);
      res.send({
        ...error,
        message: error.message
      })
    }
  }
})

module.exports = router;