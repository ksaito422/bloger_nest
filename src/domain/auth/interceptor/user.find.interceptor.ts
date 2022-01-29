import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Response = {
  id: string;
  name: string;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class UserFindInterceptor implements NestInterceptor<Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((res) => {
        const response = {
          id: res.id,
          name: res.name,
        };

        return response;
      }),
    );
  }
}
