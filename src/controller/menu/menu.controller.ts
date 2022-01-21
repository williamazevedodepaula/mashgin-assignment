import { MenuService } from '../../service/menu/menu.service';
import { IMenuController } from './menu.controller.interface';

export class MenuController implements IMenuController{

  constructor(protected menuService:MenuService){}

  public async fetchMenu(){
    return this.menuService.fetchMenu();
  }
}