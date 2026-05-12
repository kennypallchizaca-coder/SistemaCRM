# ComputacionCRM Frontend

Frontend publico y formularios de la Carrera de Computacion UPS, construido con React, TypeScript, Vite y Tailwind CSS.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run type-check
npm run build
npm run preview
```

## Variables de entorno

Copia `.env.example` como `.env.local`.

| Variable | Descripcion | Ejemplo |
| --- | --- | --- |
| `VITE_API_BASE_URL` | URL base del backend Strapi. Puede incluir o no `/api`. | `http://localhost:1337/api` |
| `VITE_APP_ENV` | Entorno de ejecucion. | `development` |
| `VITE_APP_NAME` | Nombre visible de la aplicacion. | `Carrera de Computacion UPS` |

En produccion `VITE_API_BASE_URL` debe apuntar al dominio publico HTTPS del backend.

## Estructura principal

```text
src/
  app/                 Aplicacion, rutas y paginas base
  components/          Componentes comunes y layout
  features/            Modulos por dominio: landing, admisiones, vinculacion
  lib/                 API, config, hooks, seguridad, validacion y notificaciones
  styles/              Estilos globales
public/                Assets publicos
```

## Produccion

Antes de desplegar:

1. Configura `VITE_API_BASE_URL` con la URL publica HTTPS del backend.
2. Ejecuta `npm run lint`.
3. Ejecuta `npm run build`.
4. Revisa que `vercel.json` mantenga los headers de seguridad esperados para el dominio final.

## Seguridad

El frontend incluye:

- Headers de seguridad para Vercel.
- Sanitizacion basica antes de enviar formularios.
- Peticiones publicas sin credenciales de navegador.
