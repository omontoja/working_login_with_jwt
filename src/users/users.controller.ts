import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/model/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @Get()
  findAll() {
    // console.log(request.arguments);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') registration: number) {
    return this.usersService.findOne(+registration);
  }

  // @HasRoles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @Get('admin')
  // onlyAdmin(@Request() req) {
  //   return req.user;
  // }

  // @HasRoles(Role.User)
  // @UseGuards(RolesGuard)
  // @Get('user')
  // onlyUser(@Request() req) {
  //   return req.user;
  // }

  // @Get(':username')
  // findUser(@Param('username') username: string) {
  //   return this.usersService.findUser(username);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
