# API Roles & User Assignments Challenge

Una API RESTful construida con Node.js y Express para la gestión de roles y la asignación de los mismos a usuarios. Este proyecto utiliza persistencia en memoria y sigue los principios de Clean Code, implementando un diseño basado en capas (Controladores, Servicios/Data, Middleware).

## Características
- **CRUD de Roles**: Crea, lee, actualiza y elimina roles.
- **Asignación de Roles**: Asigna y remueve roles de usuarios.
- **Validaciones y Manejo de Errores**: Middleware centralizado para respuestas consistentes en caso de error (400, 401, 404, 500).
- **Autenticación Simulada**: Middleware de validación a través del header `Authorization`.
- **Documentación Swagger**: Documentación interactiva de la API accesible vía UI.
- **Testing**: Pruebas automatizadas con Jest y Supertest.

## Tecnologías
- Node.js
- Express.js
- Swagger UI Express (OpenAPI 3.0)
- Jest & Supertest (Testing)

## Prerrequisitos
- Node.js (v14 o superior recomendado)
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio o descarga el código fuente.
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Ejecución

- **Modo Desarrollo** (con recarga automática mediante Nodemon):
  ```bash
  npm run dev
  ```
- **Modo Producción**:
  ```bash
  npm start
  ```

Por defecto, la API se levantará en `http://localhost:3000`.

## Documentación de la API (Swagger)

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva de Swagger en la siguiente ruta:

👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

## Tests

Para ejecutar la suite de pruebas (creada con Jest y Supertest), utiliza el comando:

```bash
npm test
```

## Estructura del Proyecto

```text
src/
├── app.js                 # Punto de entrada de la aplicación y configuración de Express
├── data/
│   └── db.js              # Capa de datos (Persistencia en memoria)
├── middleware/
│   ├── auth.js            # Middleware de validación del token de autorización
│   ├── errorHandler.js    # Middleware centralizado para el manejo de excepciones
│   └── validator.js       # Validaciones de los controladores
└── utils/
    └── AppError.js        # Clase personalizada para manejar errores operativos
tests/
└── app.test.js            # Suite principal de pruebas
swagger.json               # Especificación OpenAPI 3.0
```

## Guía de Despliegue (Deploy)

Esta aplicación está lista para ser desplegada en plataformas PaaS como **Render**, **Railway**, o **Heroku**. 

**Pasos generales para un despliegue:**
1. Sube este código a un repositorio en GitHub.
2. Crea un nuevo **Web Service** en la plataforma elegida y conéctalo a tu repositorio de GitHub.
3. Configuración del entorno:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Variables de Entorno**: 
   - La aplicación detectará automáticamente `process.env.PORT`, que es inyectado por defecto por plataformas como Render o Railway.
   - De ser necesario, agrega variables adicionales.

> **Nota:** La aplicación utiliza almacenamiento "en memoria" mediante arreglos simples (`src/data/db.js`). Cada vez que la plataforma PaaS reinicie el servicio (o tras un nuevo deploy), los datos volverán a su estado original (vacío). Para llevar esto a un nivel productivo real, debes reemplazar los métodos de `db.js` por consultas a una base de datos real (ej. PostgreSQL, MongoDB, MySQL).
