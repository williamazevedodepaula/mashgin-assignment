import { MenuController } from '../controller';
import { CategoryRepository, OrderRepository, ProductRepository } from '../repository';
import { Db, MongoClient } from 'mongodb';
import { MenuService } from '../service/menu/menu.service';
import { MongoDBConnectionFactory } from '../repository/mongo-db-connection-factory';
import { OrderController } from '../controller/order/order-controller';
import { OrderService } from '../service/order/order.service';



class ControllersModule{
  public readonly menuService:MenuService;
  public readonly orderService:OrderService;
  public readonly productRepository:ProductRepository;
  public readonly categoriesRepository:CategoryRepository;
  public readonly orderRepository:OrderRepository;
  public readonly menuController:MenuController;
  public readonly orderController:OrderController;
  public readonly mongoConnectionFactory:MongoDBConnectionFactory;

  constructor(){
    this.mongoConnectionFactory = new MongoDBConnectionFactory();
    //Repositories
    this.categoriesRepository = new CategoryRepository(this.mongoConnectionFactory);
    this.productRepository = new ProductRepository(this.mongoConnectionFactory);
    this.orderRepository = new OrderRepository();
    //Services
    this.menuService = new MenuService(this.categoriesRepository,this.productRepository);
    this.orderService = new OrderService(this.orderRepository);
    //Controllers
    this.menuController = new MenuController(this.menuService);
    this.orderController = new OrderController(this.orderService);
  }
}

export const controllersModule = new ControllersModule();