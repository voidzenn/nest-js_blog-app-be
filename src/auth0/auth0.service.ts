import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import config from '../config';

const headerData = {
  'content-type': 'application/json',
  'Accept-Encoding': 'gzip,deflate,compress',
  'No-Auth': 'True',
};

const bodyData = {
  client_id: config.CLIENT_ID,
  client_secret: config.CLIENT_SECRET,
  audience: config.AUTH0_AUDIENCE,
  grant_type: config.GRANT_TYPE,
};

@Injectable()
export class Auth0Service {
  constructor(private httpService: HttpService) {}

  async getAuth0Token({
    header = headerData,
    body = bodyData,
  }: {
    header?: any;
    body?: any;
  }): Promise<any> {
    try {
      return {
        data: {
          access_token: 'test',
          expires_in: 123,
        },
      };
      // return await firstValueFrom(
      //   this.httpService
      //     .post(config.AUTH0_OAUTH_TOKEN_URL, body, {
      //       headers: header,
      //     })
      //     .pipe(map((response) => response)),
      // );
    } catch (e) {
      throw e;
    }
  }
}
