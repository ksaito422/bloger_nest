import { ApiProperty } from '@nestjs/swagger';

export class UserFetchUserRes {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UserFetchUsersArticlesRes {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
