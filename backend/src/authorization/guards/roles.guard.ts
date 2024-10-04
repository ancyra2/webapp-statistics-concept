import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (
      requiredRoles &&
      !requiredRoles.some((role) => user.roles?.includes(role))
    ) {
      throw new UnauthorizedException('User does not have the required roles');
    }

    if (
      requiredPermissions &&
      !requiredPermissions.some((permission) =>
        user.permissions?.includes(permission),
      )
    ) {
      throw new UnauthorizedException(
        'User does not have the required permissions',
      );
    }

    return true;
  }

  private hasRequiredRoles(user: User, requiredRoles: Role[]): boolean {
    return requiredRoles.some((role) => user.Roles?.includes(role));
  }

  private hasRequiredPermissions(
    user: User,
    requiredPermissions: Permission[],
  ): boolean {
    return requiredPermissions.some((permission) =>
      user.Permissions?.includes(permission),
    );
  }
}
