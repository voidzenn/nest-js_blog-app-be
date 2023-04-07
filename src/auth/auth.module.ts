import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { Auth0Module } from '../auth0/auth0.module';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), Auth0Module],
  providers: [JwtStrategy, AuthService, PrismaService],
  exports: [PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
