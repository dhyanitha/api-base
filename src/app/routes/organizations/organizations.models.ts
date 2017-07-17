import { Collection, Index, Instance, Model, ObjectID, Property, Transform } from 'iridium';

export interface IOrganization {
  _id?: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  url: string;
  address: any;
  description: string;
  image: string;
  standardPrice: string;
  reducedPrice: string;
}

@Collection('organizations')
export class Organization extends Instance<IOrganization, Organization> implements IOrganization {
  @ObjectID
  public _id: string;
  @Property(String, true)
  public slug: string;
  @Property(String, true)
  public name: string;
  @Property(String, false)
  public email: string;
  @Property(String, false)
  public phone: string;
  @Property(String, false)
  public url: string;
  @Property(String, false)
  public address: any;
  @Property(String, false)
  public description: string;
  @Property(String, false)
  public image: string;
  @Property(String, false)
  public standardPrice: string;
  @Property(String, false)
  public reducedPrice: string;
}
