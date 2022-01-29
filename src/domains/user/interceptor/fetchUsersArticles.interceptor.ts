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
  title: string;
  content: string;
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class fetchUsersArticlesInterceptor
  implements NestInterceptor<Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response[]> {
    return next.handle().pipe(
      map((res) => {
        const response = res.articles.map((data): Response => {
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
