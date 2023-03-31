import { Test, TestingModule } from '@nestjs/testing';
import { shortUuid, uuid } from '../utils/getUuid';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let randomEmail: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
      controllers: [AuthController],
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
});
