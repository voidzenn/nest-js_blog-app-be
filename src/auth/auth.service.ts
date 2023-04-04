import { Injectable } from '@nestjs/common';
import { Auth0Service } from '../auth0/auth0.service';

@Injectable()
export class AuthService {
  constructor(private auth0Service: Auth0Service) {}

  async signUp() {
    const req = await this.auth0Service.getAcessToken();
    console.log(req);
    return { data: req };
  }
}
