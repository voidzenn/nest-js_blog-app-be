import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto';

describe('AuthService', () => {
  let authService: AuthService;

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
        uuid: 'id',
        fname: 'fname',
        lname: 'lname',
        address: 'address',
        email: '',
        password: '',
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
});
