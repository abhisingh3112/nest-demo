import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = Reflect.getMetadata('responseMessage', context.getHandler());

    return next.handle().pipe(
      map(data => ({
        status: true,
        message: message || 'Success',
        data,
      })),
      catchError(error => {
        const statusCode = error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        return throwError(() => ({
          status: false,
          message: error.message || 'Internal Server Error',
          statusCode,
        }));
      }),
    );
  }
}
