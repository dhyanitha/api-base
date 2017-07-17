import { Component } from "@nestjs/common";
import { DatabaseService } from "../../core/shared/database.service";
import { ROLE } from "../../core/shared/enums";
import { LoggerService } from "../../core/shared/logger.service";
import { IOrganization, Organization } from './organizations.models';

@Component()
export class OrganizationsService {
  private logger: LoggerService = new LoggerService('OrganizationsService');

  constructor(private databaseService: DatabaseService) { }

  public async getAll(): Promise<IOrganization[]> {
    const repository = await this.repository;
    const organizations = await repository.find().map(doc => doc.document);
    return organizations;
  }

  public async getById(id: string): Promise<IOrganization> {
    const repository = await this.repository;
    const organization = await repository.findOne({ _id: id });
    return organization;
  }

  public async getBySlug(slug: string): Promise<IOrganization> {
    const repository = await this.repository;
    const organization = await repository.findOne({ slug: slug });
    return organization;
  }

  public async getCount(): Promise<number> {
    const repository = await this.repository;
    const organizationsCount = await repository.count();
    return organizationsCount;
  }

  //TODO controlar slug no repe
  public async post(organization: IOrganization): Promise<IOrganization> {
    const repository = await this.repository;
    organization.slug = organization.name.replace(' ', '_');
    const newOrganization = await repository.create(organization);
    return newOrganization;
  }

  public async patch(organization: IOrganization): Promise<IOrganization> {
    const repository = await this.repository;
    const obj = {};
    //TODO study automatify this
    obj['slug'] = organization.name.replace(new RegExp(" ", "g"), '_');
    obj['name'] = organization.name;
    obj['email'] = organization.email;
    obj['phone'] = organization.phone;
    obj['url'] = organization.url;
    //TODO set address as a object
    obj['address'] = organization.address;
    obj['description'] = organization.description;
    obj['image'] = organization.image;
    obj['standardPrice'] = organization.standardPrice;
    obj['reducedPrice'] = organization.reducedPrice;
    await repository.update({ _id: organization._id }, { $set: obj });
    return this.getById(organization._id);
  }

  public async delete(id: string): Promise<void> {
    const repository = await this.repository;
    const orgExists = await repository.findOne(id);
    if (orgExists) {
      await repository.remove(id);
    } else {
      this.logger.value('Not found while deleting', id);
    }
  }

  private get repository() {
    return this.databaseService.repository<IOrganization, Organization>(Organization);
  }
}
