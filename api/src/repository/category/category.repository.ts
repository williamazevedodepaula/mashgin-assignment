import { ICategoryRepository, IMongoDBConnectionFactory } from '..';
import { Category } from '../../model';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    private connectionFactory: IMongoDBConnectionFactory
  ) { }

  async listCategories() {
    const conn = await this.getConnection();
    const categories = await conn.collection('Categories').find().toArray() as any;

    return categories.map((category: any) => {
      const model: Category = { id: category._id, ...category };
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