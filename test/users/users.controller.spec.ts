import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import * as request from 'supertest';
import { JwtStrategy } from '../../src/auth/strategy';
import { shortUuid, uuid } from '../../src/utils/getUuid';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { AuthModule } from '../../src/auth/auth.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Auth0Module } from '../../src/auth0/auth0.module';
import { AuthSignupDto } from 'src/auth/dto';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let randomEmail: string;
  let bodyData: AuthSignupDto;

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
    randomEmail = await shortUuid;
    bodyData = {
      uuid: uuid,
      fname: 'user',
      lname: 'test',
      address: 'test',
      email: randomEmail,
      password: 'test',
    };
    const signup = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(bodyData);
    console.log(signup.body);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

  it('should be defined', async () => {
    // const users = await request(app.getHttpServer()).get('/users');
    // const response = await request(app.getHttpServer()).get('/users');
    // console.log(response.status);
  });
});
