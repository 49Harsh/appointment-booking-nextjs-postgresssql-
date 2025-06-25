import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
