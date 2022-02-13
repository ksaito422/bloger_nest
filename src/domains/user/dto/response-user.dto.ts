import { ApiProperty } from '@nestjs/swagger';

export class UserFetchUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UserFetchUsersArticlesResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
