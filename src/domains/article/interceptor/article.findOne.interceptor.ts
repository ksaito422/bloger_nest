import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleDetailType } from 'src/types/response.type';

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class ArticleFindOneInterceptor
  implements NestInterceptor<ArticleDetailType>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ArticleDetailType> {
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
