import { ValidationException } from './validation.exception';

export class RequiredFieldException extends ValidationException{
  public readonly errorCode = 'required';

  constructor(public field:string){
    super(`The field "${field}" is required!`);
  }
}