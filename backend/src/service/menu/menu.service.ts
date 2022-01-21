import { Menu } from '../../model';
import { ICategoryRepository, IProductRepository } from '../../repository';
import { IMenuService } from './menu.service.interface';

export class MenuService implements IMenuService {
  constructor(
    private categoryRepository: ICategoryRepository,
    private productRepository: IProductRepository
  ) { }

  public async fetchMenu(): Promise<Menu> {
    const categories = await this.categoryRepository.listCategories();
    const products = await this.productRepository.listProducts();

    return {
      categories,
      items: products
    }
  }
}