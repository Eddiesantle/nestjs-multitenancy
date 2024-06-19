import { Global, Module } from '@nestjs/common';
import { TenantInterceptor } from './tenant.interceptor';
import { TenantService } from './tenant.service';

@Global()
@Module({
  providers: [TenantService, TenantInterceptor],
  exports: [TenantService]
})
export class TenantModule { }
