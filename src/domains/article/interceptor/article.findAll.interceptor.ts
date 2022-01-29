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
export class ArticleFindAllInterceptor
  implements NestInterceptor<ArticleType[]>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ArticleType[]> {
    return next.handle().pipe(
      map((res) => {
        const response = res.map((article): ArticleType => {
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
