import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  create(user: Omit<UserEntity, 'id' | 'registrationDate'>): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, user: Partial<Omit<UserEntity, 'id' | 'registrationDate'>>): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}