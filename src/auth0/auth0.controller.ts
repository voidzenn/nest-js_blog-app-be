import { Controller } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { ResponseTypes } from './types/response.types';

@Controller('auth0')
export class Auth0Controller {
  constructor(private auth0Service: Auth0Service) {}

  async getAccessToken({ body }: { body?: any }) {
    let responseData: ResponseTypes | null;

    await this.auth0Service
      .getAuth0Token({ body })
      .then((data: any) => {
        try {
          const values = data.data as ResponseTypes;
          if (values?.access_token && values?.expires_in) {
            responseData = {
              access_token: values?.access_token,
              expires_in: values?.expires_in,
            } as ResponseTypes;
          }
        } catch (e) {
          throw new Error(e);
        }
      })
      .catch((e) => {
        responseData = null;
        throw new Error(e);
      });

    return responseData;
  }
}
