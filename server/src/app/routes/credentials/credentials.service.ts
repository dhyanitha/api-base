import { Component } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { DatabaseService } from '../../core/shared/database.service';
import { UsersService } from '../users/users.service';
import { Credential, ICredential } from './credentials.models';

@Component()
export class CredentialsService {

  constructor(private databaseService: DatabaseService) { }

  public async post(credential: ICredential): Promise<void> {
    const repository = await this.repository;
    await repository.create(credential);
  }

  public async getByUserIdPassword(userId: string, password: string): Promise<Credential> {
    const repository = await this.repository;
    const credentials = repository.findOne({ userId, password });
    return credentials;
  }

  private get repository() {
    return this.databaseService.repository<ICredential, Credential>(Credential);
  }

  public async update(credential: ICredential): Promise<void> {
    const repository = await this.repository;
    const obj = {};
    obj['password'] = credential.password;
    debugger;
    const savedUser = await repository.update({ userId: credential.userId }, { $set: obj });
  }

}
