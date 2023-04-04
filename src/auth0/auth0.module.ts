import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';

@Module({
  imports: [HttpModule],
  providers: [Auth0Service],
  exports: [HttpModule, Auth0Service],
})
export class Auth0Module {}
