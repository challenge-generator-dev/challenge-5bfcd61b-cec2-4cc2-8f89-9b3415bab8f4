import { IsEmail, IsNotEmpty, IsString, IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'Identificador único del usuario (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Fecha de registro del usuario',
    example: '2023-01-15T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date;

  constructor(id: string, name: string, email: string, registrationDate: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.registrationDate = registrationDate;
  }
}