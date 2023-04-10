import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import * as request from 'supertest';
import { JwtStrategy } from '../../src/auth_guard/strategy';
import { uuid } from '../../src/utils/getUuid';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { AuthModule } from '../../src/auth/auth.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Auth0Module } from '../../src/auth0/auth0.module';
import { AuthSigninDto, AuthSignupDto } from '../../src/auth/dto';
import { getRandomEmail } from '../../src/utils/randomizedData';
import { Auth0Controller } from '../../src/auth0/auth0.controller';
import { Auth0Service } from '../../src/auth0/auth0.service';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let auth0Controller: Auth0Controller;
  let auth0Service: Auth0Service;
  let signupDto: AuthSignupDto;
  let signinDto: AuthSigninDto;
  let randomUuid: string;
  let randomEmail: string;
  const returnedGetAuth0TokenData = {
    data: {
      access_token: 'test',
      expires_in: 123,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, Auth0Module],
      providers: [JwtStrategy, PrismaService, AuthService],
      controllers: [UsersController, AuthController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<UsersController>(UsersController);
    auth0Controller = module.get<Auth0Controller>(Auth0Controller);
    auth0Service = module.get<Auth0Service>(Auth0Service);

    randomUuid = await uuid().then((res) => res);
    randomEmail = randomEmail ?? (await getRandomEmail().then((res) => res));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should signup and signin successfully', () => {
    it('should return the right response when running signup function succesffully', async () => {
      signupDto = {
        uuid: randomUuid,
        fname: 'user',
        lname: 'test',
        address: 'test',
        email: randomEmail,
        password: 'test',
      };

      jest
        .spyOn(auth0Controller, 'getAccessToken')
        .mockResolvedValue(returnedGetAuth0TokenData);

      expect(
        await request(app.getHttpServer())
          .post('/auth/signup')
          .send(signupDto)
          .then((response) => response.body),
      ).toEqual({
        email: expect.any(String),
        createdAt: expect.any(String),
      });
    });

    it('should return the right response when running signin function succesffully', async () => {
      signinDto = {
        email: randomEmail,
        password: 'test',
      };

      jest
        .spyOn(auth0Service, 'getAuth0Token')
        .mockResolvedValue(returnedGetAuth0TokenData);

      jest
        .spyOn(auth0Controller, 'getAccessToken')
        .mockResolvedValue(returnedGetAuth0TokenData);

      expect(
        await request(app.getHttpServer())
          .post('/auth/signin')
          .send(signinDto)
          .then((response) => response.body),
      ).toMatchObject({
        userUuid: expect.any(String),
        status: 200,
        message: expect.any(String),
        data: {
          access_token: expect.any(String),
          expires_in: expect.any(Number),
        },
      });
    });
  });
});
