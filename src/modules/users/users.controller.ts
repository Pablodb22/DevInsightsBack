import { Body, Controller, Get, Headers, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { SettingsInfoUserRequest } from './dto/SettingsInfoUserRequest';
import { SettingsPasswordUserRequest } from './dto/SettingsPasswordUserRequest';
import { SettingsTokenGithubRequest } from './dto/SettingsTokenGithubRequest';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
    verify(@Headers('authorization') authorization: string) {
      const token = authorization?.replace('Bearer ', '');
      return this.usersService.getUser(token);
    }

  @Put('')
    updateUser(@Body()data:SettingsInfoUserRequest){
      return this.usersService.updateUser(data);
    }

    @Put('/password')
    updatePass(@Body()data:SettingsPasswordUserRequest){
      return this.usersService.updatePass(data);
    }

    @Put('/token')
    updateToken(@Body()data:SettingsTokenGithubRequest){
      return this.usersService.updateToken(data);
    }

}
