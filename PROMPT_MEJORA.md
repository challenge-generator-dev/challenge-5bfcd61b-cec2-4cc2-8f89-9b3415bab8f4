# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /users`
  - `GET /users/:id`
  - `PUT /users/:id`
  - `DELETE /users/:id`
  - `GET /users`
- `client` expone http (api: http://localhost:3000):
  - `POST /users`
  - `GET /users/:id`
  - `PUT /users/:id`
  - `DELETE /users/:id`
  - `GET /users`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/services/user.service.ts` — `UserRepository.findByEmail`: Se invoca `findByEmail` sobre `UserRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261106194239047), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y Conexión a la Base de Datos — objetivo: Establecer una conexión exitosa a una base de datos SQL y NoSQL y configurar el entorno de desarrollo. — entregable (NO resolver): Documentación que detalle la configuración del entorno y la verificación de conexiones exitosas a bases de datos SQL y NoSQL.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL para gestionar usuarios en una aplicación de e-commerce. — entregable (NO resolver): Scripts SQL que implementan operaciones CRUD para gestionar usuarios en una base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL para gestionar usuarios en una aplicación de e-commerce. — entregable (NO resolver): Scripts NoSQL que implementan operaciones CRUD para gestionar usuarios en una base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "user-crud-api",
  "version": "1.0.0",
  "description": "API para gestión de usuarios con operaciones CRUD en SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "rimraf dist && tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.3.0",
    "@prisma/client": "^5.10.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "dotenv": "^16.3.1",
    "mongoose": "^8.0.3",
    "prisma": "^5.10.2",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.5",
    "@types/supertest": "^2.0.16",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.2",
    "jest": "^29.7.0",
    "prettier": "^3.1.1",
    "rimraf": "^5.0.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes para validación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('User CRUD API')
    .setDescription('API para gestión de usuarios con SQL y NoSQL')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/user.entity.ts ===
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

// === ARCHIVO: api/src/domain/repositories/user.repository.ts ===
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  create(user: Omit<UserEntity, 'id' | 'registrationDate'>): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, user: Partial<Omit<UserEntity, 'id' | 'registrationDate'>>): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/user-sql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/user-nosql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/user.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity | null> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    type: String,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all users',
    type: [UserEntity],
  })
  async listUsers(): Promise<UserEntity[]> {
    return this.userService.listUsers();
  }
}

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/user-nosql.schema.ts ===
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserNoSqlDocument = UserNoSqlModel & Document;

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class UserNoSqlModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Date, default: () => new Date() })
  registrationDate: Date;
}

export const UserNoSqlSchema = SchemaFactory.createForClass(UserNoSqlModel);

UserNoSqlSchema.index({ email: 1 }, { unique: true });
UserNoSqlSchema.index({ registrationDate: -1 });

UserNoSqlSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserNoSqlSchema.set('toObject', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// === ARCHIVO: api/src/infrastructure/controllers/user.controller.spec.ts ===
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

// === ARCHIVO: api/src/dto/create-user.dto.ts ===
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'juan.perez@ejemplo.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @MaxLength(255, { message: 'El correo electrónico no puede exceder 255 caracteres' })
  email: string;
}

// === ARCHIVO: api/src/dto/update-user.dto.ts ===
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

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/application/services/user.service.ts ===
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

// === ARCHIVO: api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String   @id @default(uuid()) @db.Uuid
  name            String   @map("name") @db.VarChar(255)
  email           String   @unique @map("email") @db.VarChar(255)
  registrationDate DateTime @default(now()) @map("registration_date") @db.Timestamp
  createdAt       DateTime @default(now()) @map("created_at") @db.Timestamp
  updatedAt       DateTime @updatedAt @map("updated_at") @db.Timestamp

  @@map("users")
  @@index([email])
  @@index([registrationDate])
}

model AuditLog {
  id         String   @id @default(uuid()) @db.Uuid
  entityType String   @map("entity_type") @db.VarChar(100)
  entityId   String   @map("entity_id") @db.Uuid
  action     String   @map("action") @db.VarChar(50)
  oldData    Json?    @map("old_data")
  newData    Json?    @map("new_data")
  performedBy String?  @map("performed_by") @db.Uuid
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamp

  @@map("audit_logs")
  @@index([entityType, entityId])
  @@index([createdAt])
}

model UserSession {
  id           String   @id @default(uuid()) @db.Uuid
  userId       String   @map("user_id") @db.Uuid
  token        String   @unique @map("token") @db.Text
  expiresAt    DateTime @map("expires_at") @db.Timestamp
  ipAddress    String?  @map("ip_address") @db.Inet
  userAgent    String?  @map("user_agent") @db.Text
  createdAt    DateTime @default(now()) @map("created_at") @db.Timestamp
  revokedAt    DateTime? @map("revoked_at") @db.Timestamp

  @@map("user_sessions")
  @@index([userId])
  @@index([expiresAt])
  @@foreignKey([userId]) references [User](id) onDelete Cascade
}

enum UserRole {
  ADMIN
  CUSTOMER
  GUEST
}

model UserProfile {
  id          String   @id @default(uuid()) @db.Uuid
  userId      String   @unique @map("user_id") @db.Uuid
  bio         String?  @db.Text
  phoneNumber String?  @map("phone_number") @db.VarChar(20)
  address     String?  @db.VarChar(500)
  city        String?  @db.VarChar(100)
  country     String?  @db.VarChar(100)
  postalCode  String?  @map("postal_code") @db.VarChar(20)
  avatarUrl   String?  @map("avatar_url") @db.Text
  preferences Json?    @db.JsonB
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamp
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamp

  @@map("user_profiles")
  @@index([userId])
  @@foreignKey([userId]) references [User](id) onDelete Cascade
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": [
      "vite/client"
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "features/*": [
        "src/features/*"
      ],
      "shared/*": [
        "src/shared/*"
      ],
      "services/*": [
        "src/services/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/package.json ===
{
  "name": "frontend-crud-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.7"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "prettier": "^3.2.5"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'features': path.resolve(__dirname, './src/features'),
      'shared': path.resolve(__dirname, './src/shared'),
      'services': path.resolve(__dirname, './src/services')
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
});

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Validación de invariantes
if (!document.getElementById('root')) {
  throw new Error('No se encontró el elemento root en el DOM');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Manejo global de errores no capturados
window.addEventListener('error', (event) => {
  console.error('Error no capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada no manejada:', event.reason);
});

// Configuración de Axios para manejar errores globalmente
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Errores del servidor (4xx, 5xx)
      console.error('Error en la respuesta:', error.response.status, error.response.data);
    } else if (error.request) {
      // Errores de red
      console.error('Error de red:', error.message);
    } else {
      // Otros errores
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Registro de servicio worker en producción
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
      console.error('Fallo en el registro del SW:', registrationError);
    });
  });
}

// === ARCHIVO: client/src/App.tsx ===
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserList } from '@/features/users/UserList';
import { UserForm } from '@/features/users/UserForm';

interface AppProps {
  initialLoading?: boolean;
}

const App: React.FC<AppProps> = ({ initialLoading = true }) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Simular carga inicial de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Manejo de errores global
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error en la aplicación</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recargar</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Usuarios</h1>
        <nav>
          <ul>
            <li>
              <a
                href="/users"
                className={location.pathname === '/users' ? 'active' : ''}
              >
                Lista de Usuarios
              </a>
            </li>
            <li>
              <a
                href="/users/new"
                className={location.pathname === '/users/new' ? 'active' : ''}
              >
                Nuevo Usuario
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} E-commerce App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de gestión de usuarios para e-commerce" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta name="theme-color" content="#2563eb" />
    <title>Gestión de Usuarios - E-commerce</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-size: 1.25rem;
        color: #666;
      }
      .error-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
      }
      .error-container h1 {
        color: #dc2626;
        margin-bottom: 1rem;
      }
      .error-container button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s;
      }
      .error-container button:hover {
        background-color: #1d4ed8;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading-container">Cargando aplicación...</div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/users/UserList.tsx ===
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/user.types';

interface UserListProps {
  onEdit?: (user: User) => void;
}

export function UserList({ onEdit }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      setUsers(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || 'Error al cargar usuarios');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || 'Error al eliminar usuario');
      } else {
        setError('Error desconocido');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="user-list-loading" role="status" aria-label="Cargando usuarios">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-error" role="alert">
        <p>Error: {error}</p>
        <button onClick={fetchUsers} type="button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <table className="user-list-table" aria-label="Lista de usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.registrationDate || 'N/A'}</td>
                <td className="user-list-actions">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      type="button"
                      aria-label={`Editar usuario ${user.name}`}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    type="button"
                    className="delete-button"
                    aria-label={`Eliminar usuario ${user.name}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={fetchUsers} type="button" className="refresh-button">
        Actualizar Lista
      </button>
    </div>
  );
}

// === ARCHIVO: client/src/features/users/UserForm.tsx ===
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, CreateUserDto, UpdateUserDto } from '@/types/user.types';

interface UserFormProps {
  user?: User | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = Boolean(user?.id);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && user?.id) {
        const data: UpdateUserDto = { name, email };
        await axios.put<User>(`http://localhost:3000/users/${user.id}`, data);
      } else {
        const data: CreateUserDto = { name, email };
        await axios.post<User>('http://localhost:3000/users', data);
      }

      if (onSuccess) {
        onSuccess();
      }

      setName('');
      setEmail('');
      setErrors({});
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        setErrors({ submit: `Error: ${message}` });
      } else {
        setErrors({ submit: 'Error desconocido al guardar' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form" aria-label={isEditMode ? 'Editar usuario' : 'Crear usuario'}>
      <h3>{isEditMode ? 'Editar Usuario' : 'Crear Usuario'}</h3>

      {errors.submit && (
        <div className="form-error" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="user-name">Nombre:</label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="user-email">Email:</label>
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
