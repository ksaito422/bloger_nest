import { ApiProperty } from '@nestjs/swagger';

export class ArticleFindAllResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class ArticleFindOneResponse {
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
  user: string;
}
