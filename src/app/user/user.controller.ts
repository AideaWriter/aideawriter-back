import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/channge-password.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async getAllUser(@Query() dto: GetUserDto) {
    return this.userService.findAll(dto);
  }

  @Get(':uid')
  async getUser(@Param('uid') uid: string) {
    return this.userService.findByUid(uid);
  }

  @Patch(':uid')
  async updateUser(@Param('uid') uid: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(uid, dto);
  }

  @Delete(':uid')
  async removeUser(@Param('uid') uid: string) {
    return this.userService.remove(uid);
  }


  @Patch(':uid/change-password')
  changePassword(
    @Param('uid') uid: string,
    @Body() changePasswordProviderDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(uid, changePasswordProviderDto);
  }

}
