import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserDocument } from './user-nosql.schema';

@Injectable()
export class UserNosqlRepository implements UserRepository, OnModuleInit, OnModuleDestroy {
  private readonly connectionName = 'users';

  constructor(
    @InjectModel(UserDocument.name, this.connectionName)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    console.log('UserNosqlRepository initialized with connection:', this.connectionName);
  }

  async onModuleDestroy(): Promise<void> {
    console.log('UserNosqlRepository destroying connections');
  }

  async create(userData: Omit<UserEntity, 'id' | 'registrationDate'>): Promise<UserEntity> {
    const createdUser = new this.userModel({
      name: userData.name,
      email: userData.email,
      registrationDate: new Date(),
    });

    const savedUser = await createdUser.save();
    return this.mapToEntity(savedUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return null;
      }
      return this.mapToEntity(user);
    } catch (error) {
      console.error('Error finding user by id:', id, error);
      return null;
    }
  }

  async update(
    id: string,
    userData: Partial<Omit<UserEntity, 'id' | 'registrationDate'>>,
  ): Promise<UserEntity | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedUser) {
      return null;
    }

    return this.mapToEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      console.warn('User not found for deletion:', id);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.mapToEntity(user));
  }

  private mapToEntity(document: UserDocument): UserEntity {
    return new UserEntity(
      document._id.toString(),
      document.name,
      document.email,
      document.registrationDate,
    );
  }
}