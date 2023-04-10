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
  let auth0Controller: Auth0Controller;
  let auth0Service: Auth0Service;
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
      controllers: [Auth0Controller],
    }).compile();

    auth0Controller = module.get<Auth0Controller>(Auth0Controller);
    auth0Service = module.get<Auth0Service>(Auth0Service);
  });

  it('should be defined', () => {
    expect(auth0Controller).toBeDefined();
  });

  it('should run getAuth0Token', async () => {
    jest
      .spyOn(auth0Service, 'getAuth0Token')
      .mockResolvedValue(returnedGetAuth0TokenData);

    expect(await auth0Controller.getAccessToken({})).toEqual(
      returnedGetAuth0TokenData,
    );
  });

  it('should throw error if there is response error in auth0', async () => {
    jest.spyOn(auth0Service, 'getAuth0Token').mockResolvedValue(new Error());

    expect(
      await auth0Controller
        .getAccessToken({ body: bodyDataBadValues })
        .catch((e) => e),
    ).rejects.toThrowError;
  });

  it('should get access_token from auth0 service', async () => {
    jest
      .spyOn(auth0Service, 'getAuth0Token')
      .mockResolvedValue(returnedGetAuth0TokenData);

    expect(
      await auth0Controller.getAccessToken({}).then((data) => {
        return data.data.access_token;
      }),
    ).toEqual(expect.any(String));
  });

  it('should get expires_in from auth0 service', async () => {
    jest
      .spyOn(auth0Service, 'getAuth0Token')
      .mockResolvedValue(returnedGetAuth0TokenData);

    expect(
      await auth0Controller.getAccessToken({}).then((data) => {
        return data.data.expires_in;
      }),
    ).toEqual(expect.any(Number));
  });
});
