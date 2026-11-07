import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UserSqlRepository implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: Omit<UserEntity, 'id' | 'registrationDate'>): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return new UserEntity(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.registrationDate,
    );
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.registrationDate,
    );
  }

  async update(
    id: string,
    user: Partial<Omit<UserEntity, 'id' | 'registrationDate'>>,
  ): Promise<UserEntity | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: user,
      });
      return new UserEntity(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.registrationDate,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) =>
        new UserEntity(
          user.id,
          user.name,
          user.email,
          user.registrationDate,
        ),
    );
  }
}