import { HttpModule } from '@nestjs/axios';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import config from '../config';
import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;
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

  const bodyDataBadValues = {
    client_id: 'test',
    client_secret: 'test',
    audience: 'test',
    grant_type: 'test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Auth0Service],
    }).compile();

    service = module.get<Auth0Service>(Auth0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw Error if provided with bad body values', async () => {
    expect(
      await service
        .getAuth0Token({ header: headerData, body: bodyDataBadValues })
        .catch((e) => e),
    ).rejects.toThrowError;
  });

  it('should get access_token data from auth0', async () => {
    expect(
      await service
        .getAuth0Token({ header: headerData, body: bodyData })
        .then((data) => {
          return data.data.access_token;
        })
        .catch((e) => {
          throw new Error(e);
        }),
    ).toEqual(expect.any(String));
  });

  it('should get expires_in data from auth0', async () => {
    expect(
      await service
        .getAuth0Token({ header: headerData, body: bodyData })
        .then((data) => {
          return data.data.expires_in;
        })
        .catch((e) => {
          throw new Error(e);
        }),
    ).toEqual(expect.any(Number));
  });
});
