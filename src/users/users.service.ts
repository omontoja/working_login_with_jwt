import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const verify = await this.findOne(createUserDto.registrationnumber);
    if (verify[0])
      throw new HttpException('Usuario já cadastrado', HttpStatus.UNAUTHORIZED);

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['registrationnumber', 'username', 'roles'],
    });
  }

  async findOne(registrationnumber: number) {
    const result = await this.usersRepository.query(
      `select * from public."user" u where u.registrationnumber = ${registrationnumber}`,
    );
    return result;
  }

  // async findUser(username: string) {
  //   const result = await this.usersRepository.findOneBy({ username });
  //   return result;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
