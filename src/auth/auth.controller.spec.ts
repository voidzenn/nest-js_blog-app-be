import { Test, TestingModule } from '@nestjs/testing';
import { shortUuid, uuid } from '../utils/getUuid';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSigninDto, AuthSignupDto } from './dto';
import { validate } from 'class-validator';
import { Auth0Controller } from '../auth0/auth0.controller';
import { Auth0Service } from '../auth0/auth0.service';
import { Auth0Module } from '../auth0/auth0.module';

describe('AuthController', () => {
  let controller: AuthController;
  let randomEmail: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Auth0Module],
      providers: [AuthService, PrismaService, Auth0Service],
      controllers: [AuthController, Auth0Controller],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    randomEmail = `user@${shortUuid}.com`;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Signup', () => {
    it('should throw error 400 or Bad Request', async () => {
      let authSignupDto: AuthSignupDto;

      expect(
        await controller.signUp(authSignupDto).catch((e) => e),
      ).toMatchObject({
        status: 400,
      });
    });

    it('should successfully signup or create user', async () => {
      const authSignupDto: AuthSignupDto = {
        uuid: uuid,
        fname: 'fname',
        lname: 'lname',
        address: 'address',
        email: randomEmail,
        password: 'test',
      };

      if (authSignupDto) {
        expect(
          await controller.signUp(authSignupDto).then((response) => response),
        ).toEqual({
          id: expect.any(Number),
          email: expect.any(String),
          createdAt: expect.any(Date),
        });
      }
    });
  });

  describe('Signin', () => {
    it('should throw error if no data is passed', async () => {
      let authSigninDto: AuthSigninDto;

      expect(
        await controller.signIn(authSigninDto).catch((e) => e),
      ).toMatchObject({
        status: 400,
      });
    });

    it('should throw error if email is not in email format', async () => {
      const authSigninDto = new AuthSigninDto();
      authSigninDto.email = 'test';
      authSigninDto.password = 'test';

      expect(await (await validate(authSigninDto)).length).toBeGreaterThan(0);
    });

    it('should throw error if email not found', async () => {
      const authSigninDto: AuthSigninDto = {
        email: 'test@email.com',
        password: '',
      };

      expect(
        await controller.signIn(authSigninDto).catch((e) => e),
      ).toMatchObject({
        status: 403,
      });
    });

    it('should throw error if wrong password', async () => {
      const authSigninDto: AuthSigninDto = {
        email: randomEmail,
        password: 'fake',
      };

      expect(
        await controller.signIn(authSigninDto).catch((e) => e),
      ).toMatchObject({
        status: 403,
      });
    });

    it('should successfully signin if email and password is verified', async () => {
      const authSigninDto: AuthSigninDto = {
        email: randomEmail,
        password: 'test',
      };

      expect(
        await controller.signIn(authSigninDto).then((response) => response),
      ).toMatchObject({
        status: 200,
        data: {
          access_token: expect.any(String),
          expires_in: expect.any(Number),
        },
      });
    });
  });
});
