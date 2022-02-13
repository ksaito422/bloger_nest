import { ApiProperty } from '@nestjs/swagger';

export class ArticleFindAllRes {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class ArticleFindOneRes {
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
