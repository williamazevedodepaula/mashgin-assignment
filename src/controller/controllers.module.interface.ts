import { IMenuService } from '../service/menu/menu.service.interface';
import { IMenuController } from './menu/menu.controller.interface';

export interface IControllersModule{
  menuService:IMenuService
  menuController:IMenuController
}