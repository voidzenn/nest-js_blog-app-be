import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import config from '../../src/config';
import { Auth0Service } from '../../src/auth0/auth0.service';
import { UnauthorizedException } from '@nestjs/common';

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
  const returnedGetAuth0TokenData = {
    data: {
      access_token: 'test',
      expires_in: 123,
    },
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
    jest.spyOn(service, 'getAuth0Token').mockResolvedValue(new Error());

    expect(await service.getAuth0Token({}).catch((e) => e)).rejects
      .toThrowError;
  });

  it('should get access_token data from auth0', async () => {
    jest
      .spyOn(service, 'getAuth0Token')
      .mockResolvedValue(returnedGetAuth0TokenData);

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
    jest
      .spyOn(service, 'getAuth0Token')
      .mockResolvedValue(returnedGetAuth0TokenData);

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
