import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { signinError } from '../constants/errors/auth.errors';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(authSignupDto: AuthSignupDto) {
    if (!authSignupDto) throw new BadRequestException();

    return await this.prisma.user
      .create({
        select: {
          id: true,
          email: true,
          createdAt: true,
          uuid: false,
        },
        data: authSignupDto,
      })
      .then((response) => response)
      .catch((e) => {
        throw new Error(e);
      });
  }

  async signIn(authSiginDto: AuthSigninDto) {
    // If request body is not satisfied throw error
    if (!authSiginDto) throw new BadRequestException();

    const user = await this.prisma.user.findFirst({
      where: {
        email: authSiginDto.email,
        password: authSiginDto.password,
      },
    });
    // If user not found throw error
    if (!user) throw new ForbiddenException(signinError.WRONG_EMAIL_PASSWORD);

    return { message: 'success' };
  }
}
