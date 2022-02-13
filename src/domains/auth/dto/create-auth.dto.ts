import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateError } from 'src/configs/constant';

export class CreateAuthDto {
  @ApiProperty()
  @IsNotEmpty({ message: `$property${ValidateError.NOT_EMPTY}` })
  @IsString({ message: `$property${ValidateError.IS_STRING}` })
  name: string;
}
