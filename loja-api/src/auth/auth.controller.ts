import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService){}

  @Post('login')
  async login(@Body() {username, password, role}: {username: string, password: string, role: string}){
    return this.authService.login(username, password, role);
  }
}