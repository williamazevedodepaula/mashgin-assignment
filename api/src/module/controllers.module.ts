import { MenuController } from '../controller';
import { CategoryRepository, ProductRepository } from '../repository';
import { Db, MongoClient } from 'mongodb';
import { MenuService } from '../service/menu/menu.service';
import { MongoDBConnectionFactory } from '../repository/mongo-db-connection-factory';



class ControllersModule{
  public readonly menuService:MenuService;
  public readonly productRepository:ProductRepository;
  public readonly categoriesRepository:CategoryRepository;
  public readonly menuController:MenuController;
  public readonly mongoConnectionFactory:MongoDBConnectionFactory;

  constructor(){
    this.mongoConnectionFactory = new MongoDBConnectionFactory();
    this.categoriesRepository = new CategoryRepository(this.mongoConnectionFactory);
    this.productRepository = new ProductRepository(this.mongoConnectionFactory);
    this.menuService = new MenuService(this.categoriesRepository,this.productRepository);
    this.menuController = new MenuController(this.menuService);
  }
}

export const controllersModule = new ControllersModule();