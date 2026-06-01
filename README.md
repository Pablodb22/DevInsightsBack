<div align="center">

<img src="https://nestjs.com/img/logo-small.svg" width="60" alt="NestJS Logo" />

# Dev Insights — Backend

**API REST construida con NestJS · TypeScript · Prisma · PostgreSQL**

[![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![GitHub API](https://img.shields.io/badge/GitHub_API-REST-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

</div>

---

## 📖 Descripción

Backend del proyecto **Dev Insights**, una plataforma orientada a equipos de desarrollo que centraliza métricas e información relevante conectando con la API de GitHub. Provee endpoints para autenticación de usuarios, gestión de perfiles y consulta de datos de GitHub a través de tokens personales.

Construido sobre **NestJS** con una arquitectura modular, **Prisma** como ORM y **PostgreSQL** como base de datos principal.

---

## 🏗️ Arquitectura

```
src/
├── app.module.ts             # Módulo raíz — importa todos los módulos
├── modules/
│   ├── auth/                 # Registro, login y guards JWT
│   ├── users/                # Gestión de perfiles, contraseñas y tokens GitHub
│   └── github/               # Integración con la API REST de GitHub
└── utils/
    └── token.ts              # Utilidades para generación y verificación JWT

prisma/
└── schema.prisma             # Esquema de base de datos (modelo User)

test/                         # Tests e2e
```

---

## ⚙️ Stack tecnológico

| Capa | Tecnología | Función |
|---|---|---|
| Framework | NestJS | Estructura modular del servidor |
| Lenguaje | TypeScript | Tipado estático |
| ORM | Prisma | Acceso y migraciones de base de datos |
| Base de datos | PostgreSQL | Persistencia de datos |
| Autenticación | JWT + bcrypt | Tokens de sesión y hashing de contraseñas |
| API externa | GitHub REST API | Consulta de repos, commits y métricas |
| Reactivo | RxJS | Manejo de streams y operaciones asíncronas |

---

## 🔗 Integración con la API de GitHub

El módulo `github/` conecta con la **GitHub REST API** usando el token personal (`githubToken`) almacenado en el perfil de cada usuario. Esto permite:

- Listar repositorios del usuario autenticado
- Consultar commits, ramas y estadísticas de actividad
- Obtener métricas del perfil público de GitHub

El token se almacena en la base de datos y se pasa en la cabecera `Authorization: Bearer <githubToken>` en cada petición a la API de GitHub.

---

## 🗄️ Modelo de datos

```prisma
model User {
  id           Int      @id @default(autoincrement())
  name         String
  lastName     String
  email        String   @unique
  password     String
  location     String?
  githubToken  String?  // Token personal de GitHub (para acceso a la API)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## 🔑 Variables de entorno

Crea un fichero `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/devinsights"

```

> ⚠️ **Nunca subas el fichero `.env` a control de versiones.**

---

## 🚀 Instalación y puesta en marcha

### Prerrequisitos

- Node.js ≥ 18
- PostgreSQL en ejecución
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Pablodb22/DevInsightsBack.git
cd DevInsightsBack

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Ejecutar migraciones de base de datos
npx prisma migrate dev

# 5. Arrancar en modo desarrollo
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run start` | Arranca en modo producción |
| `npm run start:dev` | Arranca en modo desarrollo con hot-reload |
| `npm run start:prod` | Arranca el build compilado |
| `npm run build` | Compila el proyecto a `dist/` |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Tests unitarios |
| `npm run test:e2e` | Tests end-to-end |
| `npm run test:cov` | Cobertura de tests |

---

## 🛠️ Comandos de Prisma

```bash
# Crear una nueva migración tras cambiar el schema
npx prisma migrate dev --name <nombre-migracion>

# Aplicar cambios sin crear migración (desarrollo rápido)
npx prisma db push

# Abrir Prisma Studio (explorador visual de la BD)
npx prisma studio

# Regenerar el cliente Prisma
npx prisma generate
```

---

## 🔌 Módulos de la API

### `auth`
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registro de nuevo usuario |
| POST | `/auth/login` | Login y obtención de JWT |

### `users`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users/me` | Obtener perfil del usuario autenticado |
| PATCH | `/users/settings` | Actualizar ajustes de perfil |
| PATCH | `/users/password` | Cambiar contraseña |
| PATCH | `/users/github-token` | Guardar token personal de GitHub |

### `github`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/github/repos` | Listar repositorios del usuario |
| GET | `/github/stats` | Estadísticas de actividad en GitHub |

> Los endpoints protegidos requieren la cabecera `Authorization: Bearer <jwt_token>`.

---

## 🤝 Contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit con mensajes descriptivos: `git commit -m "feat: añade endpoint de estadísticas"`
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

---

<div align="center">
  <sub>Desarrollado por <a href="https://github.com/Pablodb22">@Pablodb22</a></sub>
</div>
