import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleType } from 'src/types/response.type';

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class fetchUsersArticlesInterceptor
  implements NestInterceptor<ArticleType>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ArticleType[]> {
    return next.handle().pipe(
      map((res) => {
        const response = res.articles.map((data): ArticleType => {
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
