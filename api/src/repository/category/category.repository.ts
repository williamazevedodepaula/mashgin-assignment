import { ICategoryRepository } from '..';
import { MongoClient } from 'mongodb';
import { Category } from '../../model';

export class CategoryRepository implements ICategoryRepository {
  async listCategories() {
    try{
      const connection = await MongoClient.connect(`mongodb://api:mashgin-checkout-api-123@${process.env.DB_HOST}:${process.env.DB_PORT}`);
      const database = await connection.db('checkout-db');
      const categories = await database.collection('Categories').find().toArray() as any;
      return categories.map((category:{[key:string]:string|number|boolean})=>{
        //const model:Category = {...category, id:category._id};
       // delete (<unknown>model)._id;
        return category;
      })
    }catch(e){
      console.log(e);
    }
  }
}