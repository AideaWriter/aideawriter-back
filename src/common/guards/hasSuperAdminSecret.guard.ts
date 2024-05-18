import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class hasSuperAdminSecretGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const currentSecret = request?.body?.secret || '';
    return process.env.CREATE_SUPERADMIN_SECRET === currentSecret;
  }
}
