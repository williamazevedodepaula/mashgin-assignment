export class ApplicationException extends Error{
  constructor(public readonly errorCode:string, message:string){
    super(message);
  }
}