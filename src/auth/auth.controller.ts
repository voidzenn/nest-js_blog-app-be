import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth0Controller } from '../auth0/auth0.controller';
import { AuthService } from './auth.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private auth0Controller: Auth0Controller,
  ) {}

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
  async signIn(@Body() authSigninDto: AuthSigninDto) {
    if (!authSigninDto) throw new BadRequestException();

    return await this.authService
      .signIn(authSigninDto)
      .then(async (response) => {
        const data = await this.auth0Controller.getAccessToken({});
        response.data = data.data;
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }
}
