import { DataSource } from 'typeorm';
import postgresConnectionOptions from './orm.config';

export default new DataSource(postgresConnectionOptions);
