import config from './index';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from '../app/user/entities/user.entity';
import { ProjectsEntity } from '../app/projects/entities/projects.entity';
import { ArticlesEntity } from '../app/articles/entities/articles.entity';
import { UserProjectEntity } from '../app/user/entities/user-project.entity';
import { ProjectArticlesEntity } from '../app/projects/entities/project-articles.entity';
import { UserArticlesEntity } from '../app/user/entities/user-articles.entity';
import { TokenTrackerEntity } from '../app/ai/entity/tokenTracker.entity';


export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  //autoLoadEntities: true,
  synchronize: false,
  entities: [
    UserEntity,
    ProjectsEntity,
    ArticlesEntity,
    UserProjectEntity,
    ProjectArticlesEntity,
    UserArticlesEntity,
    TokenTrackerEntity,
  ], // array of entities
  migrations: [path.resolve(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  // logging: true,
  // logger: 'advanced-console'
};

export default postgresConnectionOptions;
