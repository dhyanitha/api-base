import { ROLE } from "../../core/shared/enums";

import { Collection, Instance, ObjectID, Property } from 'iridium';
export interface ICredential {
  _id?: string;
  userId: string;
  password: string;
}

@Collection('credentials')
export class Credential extends Instance<ICredential, Credential> implements ICredential {
  @ObjectID
  public _id?: string;
  @Property(String, true)
  public userId: string;
  @Property(String, true)
  public password: string;
}

export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserToken {
  email: string;
  name: string;
  organizationId: string;
  roles: ROLE[];
  token: string;
}

export interface IUserInvitation {
  email: string;
  name: string;
  organizationId: string;
  role: ROLE;
}

export interface IUserGodRegistration {
  email: string;
  name: string;
  password: string;
}

export interface IUserClientRegistration {
  email: string;
  name: string;
  organizationId: string;
  password: string;
}

export interface IUserPublicRegistration {
  email: string;
  name: string;
  organizationId: string;
  phone: string;
}

export interface IUserConfirmation {
  id: string;
  hash: string;
}

export interface IUserActivation {
  id: string;
  email: string;
}

export interface IUserAcceptInvitation {
  hash: string;
  password: string;
}
