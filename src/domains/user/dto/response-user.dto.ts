import { ApiProperty } from '@nestjs/swagger';
import { UserType, ArticleType } from 'src/types/response.type';

export class UserFetchUserResponse implements UserType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UserFetchUsersArticlesResponse implements ArticleType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
