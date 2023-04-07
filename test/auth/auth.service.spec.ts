import { Test, TestingModule } from '@nestjs/testing';
import { uuid } from '../../src/utils/getUuid';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AuthService } from '../../src/auth/auth.service';
import { AuthSigninDto, AuthSignupDto } from '../../src/auth/dto';
import { getRandomEmail } from '../../src/utils/randomizedData';

describe('AuthService', () => {
  let authService: AuthService;
  const randomEmail = getRandomEmail();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should define auth service', () => {
    expect(authService).toBeDefined();
  });

  describe('Signup', () => {
    it('should throw error 400 or BadRequest', async () => {
      let authSignupDto: AuthSignupDto;

      expect(
        await authService.signUp(authSignupDto).catch((e) => e),
      ).toMatchObject({
        status: 400,
      });
    });

    it('should successfully signup or create user', async () => {
      const authSignupDto: AuthSignupDto = {
        uuid: uuid(),
        fname: 'fname',
        lname: 'lname',
        address: 'address',
        email: randomEmail,
        password: 'test',
      };

      if (authSignupDto) {
        expect(
          await authService.signUp(authSignupDto).then((response) => response),
        ).toEqual({
          id: expect.any(Number),
          email: expect.any(String),
          createdAt: expect.any(Date),
        });
      }
    });
  });

  describe('Signin', () => {
    let authSigninDto: AuthSigninDto;

    it('should throw error 400 or Bad Request', async () => {
      expect(
        await authService.signIn(authSigninDto).catch((e) => e),
      ).toMatchObject({
        status: 400,
      });
    });

    it('should throw error 403 Forbidden if email not found', async () => {
      const authSigninDto: AuthSigninDto = {
        email: 'test@test.com',
        password: 'test',
      };

      if (authSigninDto) {
        expect(
          await authService.signIn(authSigninDto).catch((e) => e),
        ).toMatchObject({
          status: 403,
        });
      }
    });

    it('should throw error 403 Forbidden if provided wrong password', async () => {
      const authSigninDto: AuthSigninDto = {
        email: 'user@user.com',
        password: 'wrong pass',
      };

      if (authSigninDto) {
        expect(
          await authService.signIn(authSigninDto).catch((e) => e),
        ).toMatchObject({
          status: 403,
        });
      }
    });

    it('should have status success if provided the right email and password', async () => {
      const authSigninDto: AuthSigninDto = {
        email: randomEmail,
        password: 'test',
      };
      if (authSigninDto) {
        expect(
          await authService.signIn(authSigninDto).then((response) => response),
        ).toMatchObject({
          status: 200,
        });
      }
    });
  });
});
