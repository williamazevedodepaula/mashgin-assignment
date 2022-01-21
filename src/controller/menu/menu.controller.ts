import { IMenuService } from '../../service/menu/menu.service.interface';
import { IMenuController } from './menu.controller.interface';

export class MenuController implements IMenuController{

  constructor(protected menuService:IMenuService){}

  public async fetchMenu(){
    return this.menuService.fetchMenu();
  }
}