import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => USER_REPOSITORY))
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(
        `El usuario con email ${createUserDto.email} ya existe en el sistema`,
      );
    }

    const userData = {
      name: createUserDto.name,
      email: createUserDto.email,
    };

    const createdUser = await this.userRepository.create(userData);
    return createdUser;
  }

  async getUser(id: string): Promise<UserEntity> {
    if (!this.isValidUuid(id)) {
      throw new NotFoundException(`El usuario con ID ${id} no es válido`);
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con ID ${id} en la base de datos`,
      );
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (!this.isValidUuid(id)) {
      throw new NotFoundException(`El usuario con ID ${id} no es válido`);
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(
        `No se puede actualizar: el usuario con ID ${id} no existe`,
      );
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
      if (emailExists) {
        throw new ConflictException(
          `El email ${updateUserDto.email} ya está en uso por otro usuario`,
        );
      }
    }

    const updateData: Partial<Omit<UserEntity, 'id' | 'registrationDate'>> = {};
    if (updateUserDto.name !== undefined) {
      updateData.name = updateUserDto.name;
    }
    if (updateUserDto.email !== undefined) {
      updateData.email = updateUserDto.email;
    }

    const updatedUser = await this.userRepository.update(id, updateData);
    if (!updatedUser) {
      throw new NotFoundException(
        `Error al actualizar: no se pudo modificar el usuario con ID ${id}`,
      );
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    if (!this.isValidUuid(id)) {
      throw new NotFoundException(`El usuario con ID ${id} no es válido`);
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(
        `No se puede eliminar: el usuario con ID ${id} no existe`,
      );
    }

    await this.userRepository.delete(id);
  }

  async listUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}