import { HttpModule } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;

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

  it('should get access_token data from auth0', async () => {
    expect(
      await service
        .getAcessToken()
        .then((data) => {
          return data.access_token;
        })
        .catch((e) => {
          throw new Error(e);
        }),
    ).toEqual(expect.any(String));
  });

  it('should get expires_in data from auth0', async () => {
    expect(
      await service
        .getAcessToken()
        .then((data) => {
          return data.expires_in;
        })
        .catch((e) => {
          throw new Error(e);
        }),
    ).toEqual(expect.any(Number));
  });
});
