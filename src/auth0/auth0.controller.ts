import { Controller } from '@nestjs/common';
import { Auth0Service } from './auth0.service';

@Controller('auth0')
export class Auth0Controller {
  constructor(private auth0Service: Auth0Service) {}

  async getAccessToken({ body }: { body?: any }) {
    return await this.auth0Service
      .getAuth0Token({ body })
      .then((data: any) => {
        return data;
      })
      .catch((e) => {
        throw e;
      });
  }
}
