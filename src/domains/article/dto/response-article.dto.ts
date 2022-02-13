import { ApiProperty } from '@nestjs/swagger';
import { ArticleType, ArticleDetailType } from 'src/types/response.type';

export class ArticleFindAllResponse implements ArticleType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class ArticleFindOneResponse implements ArticleDetailType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
  })
  user: { id: string };
}
