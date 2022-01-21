import { MenuController } from '../controller';
import { CategoryRepository, ProductRepository } from '../repository';
import { MenuService } from '../service/menu/menu.service';



class ControllersModule{
  public readonly menuService:MenuService;
  public readonly productRepository:ProductRepository;
  public readonly categoriesRepository:CategoryRepository;
  public readonly menuController:MenuController;

  constructor(){
    this.categoriesRepository = new CategoryRepository();
    this.productRepository = new ProductRepository();
    this.menuService = new MenuService(this.categoriesRepository,this.productRepository);
    this.menuController = new MenuController(this.menuService);
  }
}

export const controllersModule = new ControllersModule();