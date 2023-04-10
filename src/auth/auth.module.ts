import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth0Module } from '../auth0/auth0.module';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuardModule } from '../auth_guard/auth_guard.module';

@Module({
  imports: [Auth0Module, AuthGuardModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
