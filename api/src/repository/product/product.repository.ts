import { IMongoDBConnectionFactory, IProductRepository } from '..';
import { Product } from '../../model';

export class ProductRepository implements IProductRepository{
  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }

  async listProducts(){
    const conn = await this.getConnection();
    const products = await conn.collection('Products').find().toArray() as any;

    return products.map((product: any) => {
      const model: Product = { id: product._id, ...product };
      delete (<any>model)._id;
      return model;
    });
  }

  private async getConnection() {
    const connection = await this.connectionFactory.getConnection();
    if (!connection) throw new Error('Not connected to database');
    return connection;
  }
}