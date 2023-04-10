import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import bcryptify from '../utils/bcryptify';
import { signinError } from '../constants/errors/auth.errors';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSigninDto, AuthSignupDto } from './dto';
import { responseStatus } from '../constants/responses/response.status';
import { AuthResponse } from './types/response.types';

const authRespponse: AuthResponse = {
  userUuid: null,
  status: null,
  message: null,
  data: {},
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(authSignupDto: AuthSignupDto) {
    if (!authSignupDto) throw new BadRequestException({ message: 'lols' });

    authSignupDto.password = await bcryptify.hashPass(authSignupDto.password);

    return await this.prisma.user
      .create({
        select: {
          email: true,
          createdAt: true,
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
      },
      select: {
        uuid: true,
        password: true,
      },
    });
    // If email not found throw error
    if (!user) throw new ForbiddenException(signinError.WRONG_EMAIL_PASSWORD);

    return await bcryptify
      .isMatch(authSiginDto.password, user.password)
      .then((response) => {
        if (!response)
          throw new ForbiddenException(signinError.WRONG_EMAIL_PASSWORD);

        authRespponse.userUuid = user.uuid;
        authRespponse.status = responseStatus.SUCCESS_SIGNIN.status;
        authRespponse.message = responseStatus.SUCCESS_SIGNIN.message;

        return authRespponse;
      });
  }
}
