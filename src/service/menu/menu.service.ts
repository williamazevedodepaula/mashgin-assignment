import { Menu } from '../../model';
import { IMenuService } from './menu.service.interface';

export class MenuService implements IMenuService{
  public async fetchMenu():Promise<Menu>{
    return {
      categories:[],
      items:[]
    }
  }
}