import { ValidationException } from './validation.exception';

export class EmptyArrayException extends ValidationException{
  public readonly errorCode = 'empty_array';

  constructor(public field:string){
    super(`The array "${field}" cannot be empty !`);
  }
}