import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should define auth service', () => {
    expect(authService).toBeDefined();
  });

  it('should define prisma service', () => {
    expect(prismaService).toBeDefined();
  });

  it('should throw error 400', async () => {
    let authSignupDto: AuthSignupDto;

    expect(
      await authService.signUp(authSignupDto).catch((e) => e),
    ).toMatchObject({
      status: 400,
    });
  });

  it('should throw error 400', async () => {
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
