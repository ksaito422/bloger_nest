import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserType } from 'src/types/response.type';

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class UserFindInterceptor implements NestInterceptor<UserType> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserType> {
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
