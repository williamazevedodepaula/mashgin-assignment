import { IMongoDBConnectionFactory, IOrderRepository } from '..';
import { Order } from '../../model';

export class OrderRepository implements IOrderRepository{

  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }

  async listOrders():Promise<Order[]>{
    const conn = await this.getConnection();
    const orders = await conn.collection('Orders').find().toArray() as any;

    return orders.map((order: any) => {
      const model: Order = { id: order._id, ...order };
      delete (<any>model)._id;
      return model;
    });
  }

  async create(order:Order):Promise<Order>{
    const conn = await this.getConnection();
    const result = await conn.collection('Orders').insertOne(order);
    order = {
      ...order,
      id: result.insertedId.toString(),
    };
    delete (<any>order)._id;
    return order
  }

  private async getConnection() {
    const connection = await this.connectionFactory.getConnection();
    if (!connection) throw new Error('Not connected to database');
    return connection;
  }
}