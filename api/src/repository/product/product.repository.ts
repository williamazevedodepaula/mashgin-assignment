import { IMongoDBConnectionFactory, IProductRepository } from '..';
import { Product } from '../../model';

export class ProductRepository implements IProductRepository{
  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }

  async findProductById(id:number|string):Promise<Product|undefined>{
    const conn = await this.getConnection();
    const product = await conn.collection('Products').findOne({"_id":id}) as any;
    if(product){
      const _product = {
        id: product._id,
        ...product
      }
      delete _product._id;
      return _product;
    }
  }

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