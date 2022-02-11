import { IsNotEmpty, IsString } from 'class-validator';
import { ValidateError } from 'src/configs/constant';

export class CreateArticleDto {
  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  title: string;

  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  content: string;
}
