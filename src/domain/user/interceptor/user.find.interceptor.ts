import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/domain/user/interface/user.interface';

export type Response<T> = {
  data: T;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class UserFindInterceptor<T> implements NestInterceptor<Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
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
