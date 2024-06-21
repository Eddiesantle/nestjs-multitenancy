import { Global, Module } from '@nestjs/common';
import { PrismaCoreModule } from '../prisma/prisma-core.module';
import { TenantInterceptor } from './tenant.interceptor';
import { TenantService } from './tenant.service';

@Global()
@Module({
  imports: [PrismaCoreModule],
  providers: [TenantService, TenantInterceptor],
  exports: [TenantService, TenantInterceptor]
})
export class TenantCoreModule { }
