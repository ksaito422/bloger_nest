import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserArticles } from 'src/domain/user/interface/user.interface';

export type Response<T> = {
  data: T;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class fetchUsersArticlesInterceptor<T>
  implements NestInterceptor<Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserArticles> {
    return next.handle().pipe(
      map((res) => {
        const response = res.articles.map((data) => {
          return {
            id: data.id,
            title: data.title,
            content: data.content,
          };
        });

        return response;
      }),
    );
  }
}
