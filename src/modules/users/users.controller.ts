import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
    verify(@Headers('authorization') authorization: string) {
      const token = authorization?.replace('Bearer ', '');
      return this.usersService.getUser(token);
    }
}
