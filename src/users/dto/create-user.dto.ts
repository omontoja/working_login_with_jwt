import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { Role } from 'src/model/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  registrationnumber: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  roles: Role[];
}
