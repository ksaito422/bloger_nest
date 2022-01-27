import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleFindOne } from 'src/domain/article/interface/article.interface';

export type Response<T> = {
  data: T;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class ArticleFindOneInterceptor<T>
  implements NestInterceptor<Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ArticleFindOne> {
    return next.handle().pipe(
      map((res) => {
        const response = {
          id: res.id,
          title: res.title,
          content: res.content,
          user: {
            id: res.user_id,
          },
        };

        return response;
      }),
    );
  }
}
