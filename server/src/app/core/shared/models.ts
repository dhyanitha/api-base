import { STAGES } from './enums';

interface IConfiguration {
  host?: string;
  port?: any;
  database?: string;
  username?: string;
  password?: string;
}

export interface ISettings {
  env: STAGES;
  port: any;
  secret: string;
  godEmail: 'admin@agorabinaria.com';
  database: IConfiguration;
  mailerSettings: IMailerSettings;
  path: string;
}

export interface IMailerSettings {
  service?: string;
  port?: any;
  host?: string;
  auth: {
    user: string;
    pass: string;
  };
  secure: any;
  ignoreTLS?: any;
  requireTLS?: any;
  debug: boolean;
  logger: boolean;
}
