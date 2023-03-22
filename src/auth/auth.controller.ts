import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getData() {
    return { message: 'authorized' };
  }

  @Post('signup')
  async signUp(@Body() signUpDto: AuthSignupDto) {
    return await this.authService
      .signUp(signUpDto)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });
  }

  @Post('signin')
  async signIn() {
    // async signUp() {
    //   return await this.auth0Controller.getAccessToken({});
    // }
  }
}
