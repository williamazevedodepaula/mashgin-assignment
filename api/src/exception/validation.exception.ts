export class ValidationException extends Error{
  constructor(public message:string){
    super(`A validation error has occuried: ${message}`);
  }
}