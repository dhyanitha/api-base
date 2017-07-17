import { STAGES } from './../app/core/shared/enums';
import { ISettings } from './../app/core/shared/models';

const settings: ISettings = {
  env: STAGES[process.env.env] || STAGES.dev,
  port: parseInt(process.env.port, 10) || 2000,
  secret: 'secret',
  godEmail: 'admin@agorabinaria.com',
  database: {
    database: process.env.database_name || 'base',
    username: process.env.database_username || '',
    password: process.env.database_password || '',
    host: process.env.database_host || 'localhost',
    port: parseInt(process.env.database_port, 10) || 27017,
  },
  mailerSettings: {
    port: parseInt(process.env.mailer_port, 10) || 25,
    host: process.env.mailer_host || "debugmail.io",
    secure: process.env.mailer_secure === 'true' || false,
    ignoreTLS: process.env.mailer_ignoreTLS === 'true' || true,
    auth: {
      user: process.env.mailer_user || "admin@agorabinaria.com",
      pass: process.env.mailer_pass || "82fdc8b0-55ae-11e7-954e-d7f004b08dd1"
    },
    debug: true,
    logger: true

  },
  path: process.env.prod_path || '',
};

export const SETTINGS = settings;
