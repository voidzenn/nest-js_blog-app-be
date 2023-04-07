import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import * as request from 'supertest';
import { JwtStrategy } from '../../src/auth/strategy';
import { uuid } from '../../src/utils/getUuid';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { AuthModule } from '../../src/auth/auth.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Auth0Module } from '../../src/auth0/auth0.module';
import { AuthSignupDto } from '../../src/auth/dto';
import { getRandomEmail } from '../../src/utils/randomizedData';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let bodyData: AuthSignupDto;
  let randomUuid: string;
  let randomEmail: string;
  let signedupEmail: string;

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

    randomUuid = await uuid().then((res) => res);
    randomEmail = await getRandomEmail().then((res) => res);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should signup successfully', () => {
    it('should return the right response when running signup function', async () => {
      bodyData = {
        uuid: randomUuid,
        fname: 'user',
        lname: 'test',
        address: 'test',
        email: randomEmail,
        password: 'test',
      };

      expect(
        await request(app.getHttpServer())
          .post('/auth/signup')
          .send(bodyData)
          .then((response) => response.body),
      ).toEqual({
        email: expect.any(String),
        createdAt: expect.any(String),
      });
    });
  });

  // it('sample', async () => {
  //   const signup = await request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .set('Content-Type', 'application/json')
  //     .then((response) => {
  //       return response.body;
  //     })
  //     .catch((e) => {
  //       return e.body;
  //     });
  //   console.log(signup);
  // });

  // it('should be defined', async () => {
  // const users = await request(app.getHttpServer()).get('/users');
  // const response = await request(app.getHttpServer()).get('/users');
  // console.log(response.status);
  // });
});
