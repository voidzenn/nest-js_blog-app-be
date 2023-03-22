import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(signUpDto: AuthSignupDto) {
    return await this.prisma.user
      .create({
        data: signUpDto,
      })
      .then((response) => {
        console.log(response);
        return { response };
      })
      .catch((e) => {
        console.log({ error: e });
        throw new Error(e);
      });
  }
  // async signUp() {
  //   const req = await this.auth0Controller.signUp();
  //   console.log(req);
  //   return { data: req };
  // }
}
