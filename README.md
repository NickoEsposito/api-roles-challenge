# API Roles & User Assignments Challenge

Una API RESTful construida con Node.js y Express para la gestión de roles y la asignación de los mismos a usuarios. Este proyecto utiliza persistencia en memoria y sigue los principios de Clean Code, implementando un diseño basado en capas (Controladores, Servicios, Data, Middleware).

## Enlaces

- **API en Producción:** [https://api-roles-challenge.onrender.com](https://api-roles-challenge.onrender.com)
- **Documentación de la API (Swagger en Producción):** [https://api-roles-challenge.onrender.com/docs](https://api-roles-challenge.onrender.com/docs)

## Características
- **CRUD de Roles**: Crea, lee, actualiza y elimina roles.
- **Asignación de Roles**: Asigna y remueve roles de usuarios.
- **Validaciones y Manejo de Errores**: Middleware centralizado para respuestas consistentes en caso de error (400, 401, 404, 500).
- **Autenticación Basada en Token**: Middleware de validación a través del header `Authorization` (Bearer token) y variables de entorno.
- **Documentación Swagger**: Documentación interactiva de la API accesible vía UI.
- **Testing**: Pruebas automatizadas con Jest y Supertest.

## Tecnologías
- Node.js
- Express.js
- Swagger UI Express (OpenAPI 3.0)
- Jest & Supertest (Testing)
- Dotenv (Variables de entorno)

## Prerrequisitos
- Node.js (v14 o superior recomendado)
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio o descarga el código fuente.
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Variables de Entorno

El proyecto utiliza variables de entorno para su configuración. Crear un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

```env
PORT=3000
TOKEN_AUTH=secret-token-123
```

## Ejecución y Uso

- **Modo Desarrollo** (con recarga automática mediante Nodemon):
  ```bash
  npm run dev
  ```
- **Modo Producción**:
  ```bash
  npm start
  ```

## Tests

Para ejecutar la suite de pruebas (creada con Jest y Supertest), utiliza el comando:

```bash
npm test
```

## Estructura del Proyecto

api-roles-challenge/
├── .env                   # Variables de entorno (no versionado)
├── package.json           # Dependencias y scripts
├── README.md              # Documentación del proyecto
├── src/
│   ├── app.js             # Punto de entrada de la aplicación y configuración
│   ├── swagger.json       # Especificación OpenAPI 3.0
│   ├── controllers/
│   │   └── roleController.js # Lógica de control de las peticiones
│   ├── data/
│   │   └── db.js          # Capa de datos (Persistencia en memoria)
│   ├── middleware/
│   │   ├── auth.js        # Middleware de validación del token de autorización
│   │   ├── errorHandler.js# Middleware centralizado para manejo de excepciones
│   │   └── validator.js   # Validaciones de request (body, params)
│   ├── services/
│   │   └── roleService.js # Reglas de negocio y lógica de aplicación
│   └── utils/
│       └── AppError.js    # Clase personalizada para errores operativos
└── tests/
    ├── app.test.js        # Pruebas de integración
    └── roleService.test.js# Pruebas unitarias de los servicios
```


> **Nota:** La aplicación utiliza almacenamiento "en memoria" mediante arreglos simples (`src/data/db.js`). Cada vez que la plataforma PaaS reinicie el servicio, los datos volverán a su estado original. .