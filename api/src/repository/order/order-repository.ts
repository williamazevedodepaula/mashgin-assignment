import { IMongoDBConnectionFactory, IOrderRepository } from '..';
import { Order } from '../../model';

export class OrderRepository implements IOrderRepository{

  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }
  async create(order:Order):Promise<Order>{
    const conn = await this.getConnection();
    const _order = await conn.collection('Orders').insertOne(order);
    return {...order,id:_order.insertedId.toString()}
  }

  private async getConnection() {
    const connection = await this.connectionFactory.getConnection();
    if (!connection) throw new Error('Not connected to database');
    return connection;
  }
}