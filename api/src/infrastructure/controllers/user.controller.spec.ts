import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from '../../application/services/user.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let controller: UserController;
  let service: UserService;

  const mockUser: UserEntity = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    email: 'john.doe@example.com',
    registrationDate: new Date('2024-01-15T10:30:00Z'),
  };

  const mockUsers: UserEntity[] = [
    mockUser,
    {
      id: '223e4567-e89b-12d3-a456-426614174001',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      registrationDate: new Date('2024-02-20T14:45:00Z'),
    },
  ];

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'John Updated' }),
    delete: jest.fn().mockResolvedValue(undefined),
    findAll: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('debería crear un usuario exitosamente', async () => {
      const createDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createDto)
        .expect(201);

      expect(response.body).toEqual(mockUser);
      expect(mockUserService.create).toHaveBeenCalledWith(createDto);
    });

    it('debería fallar con validación cuando name está vacío', async () => {
      const invalidDto = {
        name: '',
        email: 'test@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(invalidDto)
        .expect(400);

      expect(response.body.message).toContain('name should not be empty');
      expect(mockUserService.create).not.toHaveBeenCalled();
    });

    it('debería fallar con validación cuando email es inválido', async () => {
      const invalidDto = {
        name: 'Test User',
        email: 'not-an-email',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(invalidDto)
        .expect(400);

      expect(response.body.message).toContain('email must be an email');
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /users/:id', () => {
    it('debería obtener un usuario por ID', async () => {
      const userId = mockUser.id;

      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);

      expect(response.body).toEqual(mockUser);
      expect(mockUserService.findById).toHaveBeenCalledWith(userId);
    });

    it('debería retornar 404 cuando el usuario no existe', async () => {
      const nonExistentId = '999e4567-e89b-12d3-a456-426614174999';
      mockUserService.findById.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get(`/users/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toContain('User not found');
    });
  });

  describe('PUT /users/:id', () => {
    it('debería actualizar un usuario exitosamente', async () => {
      const userId = mockUser.id;
      const updateDto: UpdateUserDto = {
        name: 'John Updated',
      };

      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.name).toBe('John Updated');
      expect(mockUserService.update).toHaveBeenCalledWith(userId, updateDto);
    });

    it('debería retornar 404 cuando se intenta actualizar usuario inexistente', async () => {
      const nonExistentId = '999e4567-e89b-12d3-a456-426614174999';
      const updateDto: UpdateUserDto = { name: 'New Name' };
      mockUserService.update.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .put(`/users/${nonExistentId}`)
        .send(updateDto)
        .expect(404);

      expect(response.body.message).toContain('User not found');
    });
  });

  describe('DELETE /users/:id', () => {
    it('debería eliminar un usuario exitosamente', async () => {
      const userId = mockUser.id;

      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(204);

      expect(mockUserService.delete).toHaveBeenCalledWith(userId);
    });

    it('debería retornar 404 cuando se intenta eliminar usuario inexistente', async () => {
      const nonExistentId = '999e4567-e89b-12d3-a456-426614174999';
      mockUserService.delete.mockRejectedValue(new Error('User not found'));

      const response = await request(app.getHttpServer())
        .delete(`/users/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toContain('User not found');
    });
  });

  describe('GET /users', () => {
    it('debería listar todos los usuarios', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual(mockUsers);
      expect(response.body).toHaveLength(2);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });

    it('debería retornar array vacío cuando no hay usuarios', async () => {
      mockUserService.findAll.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([]);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('Manejo de errores global', () => {
    it('debería manejar errores internos del servidor', async () => {
      mockUserService.findAll.mockRejectedValue(new Error('Database connection failed'));

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(500);

      expect(response.body.message).toContain('Internal server error');
    });

    it('debería manejar errores de validación del cuerpo de la petición', async () => {
      const invalidDto = {
        name: 'A'.repeat(300),
        email: 'valid@email.com',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(invalidDto)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });