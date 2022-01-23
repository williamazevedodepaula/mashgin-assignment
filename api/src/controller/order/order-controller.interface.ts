import { Order } from '../../model';

export interface IOrderController{
  createNewOrder(data:any):Promise<Order>
}