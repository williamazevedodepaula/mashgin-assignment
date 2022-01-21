import { Request, Response } from 'express';
import { controllersModule } from '../controller/controllers.module';

const express = require('express');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.send(
    await controllersModule.menuController.fetchMenu()
  )
})

module.exports = router;