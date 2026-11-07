import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserSqlRepository } from './infrastructure/repositories/sql/user-sql.repository';
import { UserNoSqlRepository } from './infrastructure/repositories/nosql/user-nosql.repository';
import { DatabaseConfigService } from './infrastructure/config/database.config';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NOSQL_URI') || 'mongodb://localhost:27017/userdb',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    UserService,
    UserSqlRepository,
    UserNoSqlRepository,
    DatabaseConfigService,
    {
      provide: PrismaClient,
      useFactory: (configService: ConfigService) => {
        return new PrismaClient({
          datasources: {
            db: {
              url: configService.get<string>('DATABASE_URL'),
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [UserService, UserSqlRepository, UserNoSqlRepository, DatabaseConfigService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}
}