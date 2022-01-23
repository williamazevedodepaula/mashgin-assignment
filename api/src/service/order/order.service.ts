import { ApplicationException } from '../../exception';
import { Order, OrderItem, Payment } from '../../model';
import { IOrderRepository, IProductRepository } from '../../repository';
import { IOrderService } from './order.service.interface';

export class OrderService implements IOrderService{
  constructor(
    private orderRepository:IOrderRepository,
    private productRepository:IProductRepository,
  ){}

  async createNewOrder(order:Partial<Order>):Promise<Order>{
    await this.validateOrder(order);
    const total = order.items?.reduce((sum,it)=>sum+(it.price||0),0)
    return this.orderRepository.create({...order, total});
  }

  async listOrders():Promise<Order[]>{
    return this.orderRepository.listOrders();
  }

  private async validateItem(item:OrderItem){
    if(item.price < 0){
      throw new ApplicationException('negativePrice','The field "price" should have a positive value');
    }

    const product = await this.productRepository.findProductById(item.product_id);
    if(!product) throw new ApplicationException('invalidProduct',`The product with id "${item.product_id}" does not exist`);
  }

  private async validateOrder(order:Partial<Order>){
    const promises = order.items!.map(it=>this.validateItem(it));
    return Promise.all(promises);
  }
}