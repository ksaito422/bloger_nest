import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateError } from 'src/configs/constant';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  content: string;
}
