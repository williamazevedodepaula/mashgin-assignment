export class ValidationException extends Error{
  constructor(msg:string){
    super(`A validation error has occuried: ${msg}`);
  }
}