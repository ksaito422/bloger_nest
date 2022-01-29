import { IsNotEmpty, IsString } from 'class-validator';
import { ValidateError } from 'src/configs/constant';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString({ message: ValidateError.IS_STRING })
  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  content: string;
}
