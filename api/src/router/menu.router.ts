import { Request, Response } from 'express';
import { controllersModule } from '../module/controllers.module';

const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');//@TODO check availability of using middleware
  res.send(
    await controllersModule.menuController.fetchMenu()
  )
})

module.exports = router;