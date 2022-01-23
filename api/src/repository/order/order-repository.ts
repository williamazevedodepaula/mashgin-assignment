import { IMongoDBConnectionFactory, IOrderRepository } from '..';
import { Order } from '../../model';

export class OrderRepository implements IOrderRepository{

  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }
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