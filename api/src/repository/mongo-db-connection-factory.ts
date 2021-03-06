import { Db, MongoClient } from 'mongodb';
import { IMongoDBConnectionFactory } from '.';

export class MongoDBConnectionFactory implements IMongoDBConnectionFactory{
  private connection?:MongoClient;
  private database?:Db;

  async getConnection(){
    if(!this.connection) await this.createConnection();
    if(!this.database) await this.connectToDatabase();
    return this.database;
  }

  private async createConnection(){
    //this.connection = await MongoClient.connect(`mongodb://api:mashgin-checkout-api-123@${process.env.DB_HOST}:${process.env.DB_PORT}`);
    this.connection = await MongoClient.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
  }
  private async connectToDatabase(){
    this.database = await this.connection?.db(process.env.DB_NAME);
  }
}