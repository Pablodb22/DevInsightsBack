import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/LoginRequest';
import { RegisterRequest } from './dto/RegisterRequest';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }
 
}
