import { IsNumber, IsString } from 'class-validator';
import { Role } from 'src/model/role.enum';

export class CreateUserDto {
  @IsNumber()
  registrationnumber: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  roles: Role[];
}
