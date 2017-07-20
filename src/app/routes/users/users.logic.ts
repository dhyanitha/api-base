import { Component } from "@nestjs/common";
import { LoggerService } from "../../core/shared/logger.service";
import { UsersService } from "./../users/users.service";
import { IUser, User } from './../users/users.models';
import { OrganizationsService } from "./../organizations/organizations.service";
import { ROLE } from "../../core/shared/enums";

@Component()
export class UsersLogic {
  constructor(
    private usersService: UsersService, private organizationsService: OrganizationsService) { }


  public async getAdministratedUsers(userId:string): Promise<IUser[]> {
    const user = await this.usersService.getById(userId);
    if (user.roles.includes(ROLE.GOD)) {
      return this.usersService.getAll();
    }
    else if (user.roles.includes(ROLE.ADMIN)) {
      this.usersService.getByOrganizationId(user.organizationId);
    }
  }
}
