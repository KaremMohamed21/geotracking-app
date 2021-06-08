import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get all users
  @Get()
  @HttpCode(200)
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  // Post user position
  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  postUserPosition(@Body() user: User): string {
    this.usersService.postLocation(user);
    return "User's location fetched successfully";
  }
}
