import { Menu } from '../../model';
import { ICategoryRepository, IProductRepository } from '../../repository';
import { IMenuService } from './menu.service.interface';

export class MenuService implements IMenuService{
  constructor(
    categoryRepository:ICategoryRepository,
    productRepository:IProductRepository
  ){}

  public async fetchMenu():Promise<Menu>{
    return {
      categories:[],
      items:[]
    }
  }
}