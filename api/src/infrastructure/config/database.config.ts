import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';

export interface DatabaseConfig {
  sql: {
    url: string;
    logQueries: boolean;
    timeout: number;
  };
  nosql: {
    uri: string;
    dbName: string;
    connectionOptions: {
      maxPoolSize: number;
      minPoolSize: number;
      serverSelectionTimeoutMS: number;
      socketTimeoutMS: number;
    };
  };
}

@Injectable()
export class DatabaseConfigService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseConfigService.name);
  private prismaClient: PrismaClient;
  private mongooseConnection: mongoose.Connection | null = null;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: this.getSqlDatabaseUrl(),
        },
      },
      log: this.getSqlLogQueries() ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.initializeConnections();
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeConnections();
  }

  private getSqlDatabaseUrl(): string {
    const host = this.configService.get<string>('DATABASE_HOST', 'localhost');
    const port = this.configService.get<number>('DATABASE_PORT', 5432);
    const username = this.configService.get<string>('DATABASE_USERNAME', 'postgres');
    const password = this.configService.get<string>('DATABASE_PASSWORD', 'postgres');
    const database = this.configService.get<string>('DATABASE_NAME', 'user_crud');

    return `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;
  }

  private getSqlLogQueries(): boolean {
    return this.configService.get<string>('DATABASE_SQL_LOG_QUERIES', 'false') === 'true';
  }

  private getNosqlUri(): string {
    const host = this.configService.get<string>('MONGODB_HOST', 'localhost');
    const port = this.configService.get<number>('MONGODB_PORT', 27017);
    const username = this.configService.get<string>('MONGODB_USERNAME', '');
    const password = this.configService.get<string>('MONGODB_PASSWORD', '');
    const database = this.configService.get<string>('MONGODB_DATABASE', 'user_crud');

    if (username && password) {
      return `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    }

    return `mongodb://${host}:${port}/${database}`;
  }

  private getNosqlOptions(): mongoose.ConnectOptions {
    const maxPoolSize = this.configService.get<number>('MONGODB_POOL_SIZE', 10);
    const minPoolSize = this.configService.get<number>('MONGODB_MIN_POOL_SIZE', 2);
    const serverSelectionTimeoutMS = this.configService.get<number>('MONGODB_SERVER_SELECTION_TIMEOUT', 5000);
    const socketTimeoutMS = this.configService.get<number>('MONGODB_SOCKET_TIMEOUT', 45000);

    return {
      maxPoolSize,
      minPoolSize,
      serverSelectionTimeoutMS,
      socketTimeoutMS,
    } as mongoose.ConnectOptions;
  }

  private async initializeConnections(): Promise<void> {
    try {
      await this.initializeSqlConnection();
      await this.initializeNosqlConnection();
      this.isConnected = true;
      this.logger.log('All database connections initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize database connections', error);
      throw error;
    }
  }

  private async initializeSqlConnection(): Promise<void> {
    try {
      await this.prismaClient.$connect();
      this.logger.log('SQL database connection established');
    } catch (error) {
      this.logger.error('Failed to connect to SQL database', error);
      throw error;
    }
  }

  private async initializeNosqlConnection(): Promise<void> {
    const uri = this.getNosqlUri();
    const options = this.getNosqlOptions();

    try {
      await mongoose.connect(uri, options);
      this.mongooseConnection = mongoose.connection;
      this.mongooseConnection.on('error', (err) => {
        this.logger.error('MongoDB connection error', err);
      });
      this.mongooseConnection.on('disconnected', () => {
        this.logger.warn('MongoDB disconnected');
      });
      this.mongooseConnection.on('reconnected', () => {
        this.logger.log('MongoDB reconnected');
      });
      this.logger.log('NoSQL database connection established');
    } catch (error) {
      this.logger.error('Failed to connect to NoSQL database', error);
      throw error;
    }
  }

  private async closeConnections(): Promise<void> {
    try {
      if (this.prismaClient) {
        await this.prismaClient.$disconnect();
        this.logger.log('SQL database connection closed');
      }

      if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
        this.logger.log('NoSQL database connection closed');
      }

      this.isConnected = false;
    } catch (error) {
      this.logger.error('Error closing database connections', error);
    }
  }

  getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  getMongooseConnection(): mongoose.Connection {
    if (!this.mongooseConnection) {
      throw new Error('Mongoose connection not initialized');
    }
    return this.mongooseConnection;
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      sql: {
        url: this.getSqlDatabaseUrl(),
        logQueries: this.getSqlLogQueries(),
        timeout: this.configService.get<number>('DATABASE_TIMEOUT', 30000),
      },
      nosql: {
        uri: this.getNosqlUri(),
        dbName: this.configService.get<string>('MONGODB_DATABASE', 'user_crud'),
        connectionOptions: this.getNosqlOptions(),
      },
    };
  }

  isDatabaseConnected(): boolean {
    return this.isConnected;
  }
}