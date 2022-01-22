import { Db } from 'mongodb';

export interface IMongoDBConnectionFactory{
  getConnection():Promise<Db|undefined>
}