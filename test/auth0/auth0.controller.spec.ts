import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Auth0Controller } from '../../src/auth0/auth0.controller';
import { Auth0Service } from '../../src/auth0/auth0.service';

const bodyDataBadValues = {
  client_id: 'test',
  client_secret: 'test',
  audience: 'test',
  grant_type: 'test',
};

describe('Auth0Controller', () => {
  let controller: Auth0Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Auth0Service],
      controllers: [Auth0Controller],
    }).compile();

    controller = module.get<Auth0Controller>(Auth0Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw error if there is response error in auth0', async () => {
    expect(
      await controller
        .getAccessToken({ body: bodyDataBadValues })
        .catch((e) => e),
    ).rejects.toThrowError;
  });

  it('should get access_token from auth0 service', async () => {
    expect(
      await controller.getAccessToken({}).then((data) => {
        return data.access_token;
      }),
    ).toEqual(expect.any(String));
  });

  it('should get expires_in from auth0 service', async () => {
    expect(
      await controller.getAccessToken({}).then((data) => {
        return data.expires_in;
      }),
    ).toEqual(expect.any(Number));
  });
});
