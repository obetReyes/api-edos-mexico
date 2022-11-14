export class AppError extends Error {
    statusCode:number | undefined
    errorCode: string;
    href:string;
    constructor(errorCode: string, message: string,  href:string, statusCode?: number,) {
      super(message);
      this.errorCode = errorCode;
      this.href = href
      this.statusCode = statusCode;
    }
  }
  


