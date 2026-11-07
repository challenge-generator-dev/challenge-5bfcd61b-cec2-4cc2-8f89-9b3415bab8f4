# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL**.

| | |
|---|---|
| Tema | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| Nivel | trainee-l2 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 19 |
| Patron arquitectonico | componentes reutilizables con separación contenedor/presentacional |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react ^19.0.0
- react-dom ^19.0.0
- react-router-dom ^6.22.0
- @types/react ^18.2.56
- @types/react-dom ^18.2.19
- axios ^1.6.7
- @vitejs/plugin-react ^4.2.1
- typescript ^5.3.3
- vite ^5.1.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración y Conexión a la Base de Datos**: Documentación que detalle la configuración del entorno y la verificación de conexiones exitosas a bases de datos SQL y NoSQL.
- **Fase 2 — Implementación de Operaciones CRUD en Base de Datos SQL**: Scripts SQL que implementan operaciones CRUD para gestionar usuarios en una base de datos SQL.
- **Fase 3 — Implementación de Operaciones CRUD en Base de Datos NoSQL**: Scripts NoSQL que implementan operaciones CRUD para gestionar usuarios en una base de datos NoSQL.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (1)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `api/src/application/services/user.service.ts` — `UserRepository.findByEmail`
      Se invoca `findByEmail` sobre `UserRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (29)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/main.ts`
- `api/src/domain/entities/user.entity.ts`
- `api/src/domain/repositories/user.repository.ts`
- `api/src/infrastructure/repositories/sql/user-sql.repository.ts`
- `api/src/infrastructure/repositories/nosql/user-nosql.repository.ts`
- `api/src/infrastructure/controllers/user.controller.ts`
- `api/src/infrastructure/config/database.config.ts`
- `api/src/infrastructure/repositories/nosql/user-nosql.schema.ts`
- `api/src/infrastructure/controllers/user.controller.spec.ts`
- `api/src/dto/create-user.dto.ts`
- `api/src/dto/update-user.dto.ts`
- `api/src/app.module.ts`
- `api/src/application/services/user.service.ts`
- `api/prisma/schema.prisma`
- `client/tsconfig.json`
- `client/package.json`
- `client/vite.config.ts`
- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/index.html`
- `client/src/features/users/UserList.tsx`
- `client/src/features/users/UserForm.tsx`
- `.run/api.run.xml`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`
- `infra-local/mongo/init.js`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `api`
- `api/src/domain/entities`
- `api/src/domain/repositories`
- `api/src/application/services`
- `api/src/infrastructure/controllers`
- `api/src/infrastructure/repositories/sql`
- `api/src/infrastructure/repositories/nosql`
- `api/src/infrastructure/config`
- `client`
- `client/src/app`
- `client/src/features/users`
- `client/src/shared/components`
- `client/src/services`

## Verificacion

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **componentes reutilizables con separación contenedor/presentacional**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2
- Brecha que el reto ataca: Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261106194239047), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
