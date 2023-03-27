import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  async signUp(@Body() authSignupDto: AuthSignupDto) {
    if (!authSignupDto) throw new BadRequestException();

    return await this.authService
      .signUp(authSignupDto)
      .then((response) => response)
      .catch((e) => {
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
