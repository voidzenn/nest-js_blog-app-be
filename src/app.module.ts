import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Auth0Module } from './auth0/auth0.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, Auth0Module, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
