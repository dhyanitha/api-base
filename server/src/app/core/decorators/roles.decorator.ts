/*import { UseFilters } from '@nestjs/common';
import { ROLE } from "./../shared/enums";
import { ForbiddenException } from './../shared/exceptions';

export function Roles(roles?: ROLE[]) {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> => {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const user = args[0];
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
      const result = originalMethod.apply(this);
      return result;
    };
    return descriptor;
  };
}

const defineFiltersMetadata = (...filters: ExceptionFilter[]) => {
    return (target: object, key?, descriptor?) => {
        if (descriptor) {
            Reflect.defineMetadata(EXCEPTION_FILTERS_METADATA, filters, descriptor.value);
            return descriptor;
        }
        Reflect.defineMetadata(EXCEPTION_FILTERS_METADATA, filters, target);
        return target;
    };
};

export const Roles = (...filters: ExceptionFilter[]) => defineFiltersMetadata(...filters);*/
