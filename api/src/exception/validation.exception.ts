export class ValidationException extends Error{
  constructor(msg:string){
    super(`A validation erro has occuried: ${msg}`);
  }
}