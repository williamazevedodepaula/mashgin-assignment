import { ValidationException } from './validation.exception';

export class RequiredFieldException extends ValidationException{
  constructor(public field:string){
    super(`The field ${field} is required!`);
  }
}