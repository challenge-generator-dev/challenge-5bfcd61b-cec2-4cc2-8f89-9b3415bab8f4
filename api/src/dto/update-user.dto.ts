import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez Actualizado',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico único del usuario',
    example: 'juan.perez.actualizado@ejemplo.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @MaxLength(255, { message: 'El correo electrónico no puede exceder 255 caracteres' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Datos adicionales del perfil de usuario',
    example: { address: 'Calle Principal 123', phone: '+1234567890' },
  })
  @IsOptional()
  @IsObject({ message: 'Los datos adicionales deben ser un objeto' })
  @Type(() => Object)
  additionalData?: Record<string, any>;
}