import { Injectable } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private auth0Controller: AuthController) {}

  // async signUp() {
  //   const req = await this.auth0Controller.signUp();
  //   console.log(req);
  //   return { data: req };
  // }
}
