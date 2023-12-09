import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"; 
import { FirebaseAuthGuard } from "./firebase-auth.guard";
import { RolesType } from "src/interfaces/user-role.interface";

@Injectable()
export class AllowedAdminGuard implements CanActivate {
  constructor(
    // private readonly reflector: Reflector,
    private readonly auth: FirebaseAuthGuard
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = [ RolesType.admin];

    await this.auth.canActivate(context);
    const req = context
      .switchToHttp()
      .getRequest();
    const user = req?.user; 

    if (user == null || user.uid == null) {
      console.log(`ERR: User not found`);
      throw new UnauthorizedException("User not found");
    }

    const _validate = user.roles.some((role: RolesType) =>
      requiredRoles.includes(role)
    );

    if (!_validate) {
      throw new UnauthorizedException(
        "Your current role is not permitted to make this request"
      );
    }

    return _validate;
  }
}
