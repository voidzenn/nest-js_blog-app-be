import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Auth0Module } from './auth0/auth0.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, Auth0Module, PrismaModule],
})
export class AppModule {}
