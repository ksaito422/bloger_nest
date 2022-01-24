import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Response<T> = {
  data: T;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class ArticleFindAllInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res) => {
        const response = res.map((article) => {
          return {
            id: article.id,
            title: article.title,
            content: article.content,
          };
        });

        return response;
      }),
    );
  }
}
