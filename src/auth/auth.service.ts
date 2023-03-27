import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignupDto } from './dto';

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
}
