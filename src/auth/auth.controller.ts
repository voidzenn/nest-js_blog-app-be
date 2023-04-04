import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth0Controller } from 'src/auth0/auth0.controller';

@Controller('auth')
export class AuthController {
  constructor(private auth0Controller: Auth0Controller) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getData() {
    return { message: 'authorized' };
  }

  @Post('signup')
  async signUp() {
    return await this.auth0Controller.getAccessToken({});
  }
}
