import { IUser } from './../../routes/users/users.models';
import { ROLE } from "./../shared/enums";
import { ForbiddenException } from './../shared/exceptions';

/**
 * Function to validate roles of user, is not authorized throw forbidden exception
 * @param user The session of the user
 * @param roles Array of roles to be authorized, if none all is authorized
 */
export function roles(user: IUser, roles?: ROLE[]) {
  let isAuthorized = true;
  if (roles) {
    isAuthorized = roles.some(rol => {
      return user.roles.some(userRol => {
        return userRol === rol;
      });
    });
  }
  if (!isAuthorized) {
    throw new ForbiddenException('No enogugh rol');
  }
}

/*
import { roles } from './../../core/utils/utils';
@Session() session: IUser
roles(session, [ROLE.ADMIN]);
*/
