import { env } from 'node:process';

export default {
  host: env['POST_GRES_HOST'],
  port: env['POST_GRES_PORT'],
  user: env['POST_GRES_USER'],
  password: env['POST_GRES_PASSWORD'],
  database: env['POST_GRES_DB'],
  dev: env['POST_GRES_DEV'],
  debug: env['POST_GRES_DEBUG'],
};
