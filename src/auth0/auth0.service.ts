import { HttpService } from '@nestjs/axios';
import { Injectable, Post } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import config from '../config';
import { ResponseTypes } from './types/response.types';
import * as dotenv from 'dotenv';

@Injectable()
export class Auth0Service {
  constructor(private httpService: HttpService) {}

  @Post('acess_token')
  async getAcessToken(): Promise<ResponseTypes> {
    let responseData: ResponseTypes | null;

    await this.requesToAuth0()
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
          console.log(e);
          throw new Error(e);
        }
      })
      .catch((e) => {
        responseData = null;
        console.log(e);
        throw new Error(e);
      });

    return responseData;
  }

  private async requesToAuth0(): Promise<any> {
    const bodyData = {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      audience: config.AUTH0_AUDIENCE,
      grant_type: config.GRANT_TYPE,
    };

    const headers = {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip,deflate,compress',
      'No-Auth': 'True',
    };

    try {
      return await firstValueFrom(
        this.httpService
          .post(config.AUTH0_OAUTH_TOKEN_URL, bodyData, {
            headers,
          })
          .pipe(map((response) => response)),
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
