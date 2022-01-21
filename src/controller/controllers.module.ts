import { MenuService } from '../service/menu/menu.service';
import { IControllersModule } from './controllers.module.interface';
import { MenuController } from './menu/menu.controller';



class ControllersModule implements IControllersModule{
  public menuService:MenuService;
  public menuController:MenuController;

  constructor(){
    this.menuService = new MenuService();
    this.menuController = new MenuController(this.menuService);
  }
}

export const controllersModule = new ControllersModule();