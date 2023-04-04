import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { Auth0Controller } from './auth0.controller';

@Module({
  imports: [HttpModule],
  providers: [Auth0Service, Auth0Controller],
  exports: [HttpModule, Auth0Controller],
  controllers: [Auth0Controller],
})
export class Auth0Module {}
