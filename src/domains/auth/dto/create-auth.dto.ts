import { IsNotEmpty, IsString } from 'class-validator';
import { ValidateError } from 'src/configs/constant';

export class CreateAuthDto {
  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  name: string;
}
