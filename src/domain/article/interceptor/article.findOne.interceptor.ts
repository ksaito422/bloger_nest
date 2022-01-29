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
  user: {
    id: string;
  };
};

/**
 * レスポンスのフォーマット用クラス
 */
@Injectable()
export class ArticleFindOneInterceptor implements NestInterceptor<Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
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
