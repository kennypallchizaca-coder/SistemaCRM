# ComputacionCRM

Sistema de Gestión de Relaciones con Clientes (CRM) desarrollado con **React + TypeScript + Vite**.

---

## 🚀 Tecnologías

| Tecnología | Versión |
|-----------|---------|
| React | ^19 |
| TypeScript | ~6 |
| Vite | ^8 |
| ESLint | ^10 |

---

## 📁 Estructura del Proyecto

```
ComputacionCRM/
├── public/                     # Archivos estáticos públicos
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/                 # Recursos multimedia
│   │   ├── images/             # Imágenes (PNG, JPG, WebP)
│   │   └── icons/              # Iconos SVG
│   │
│   ├── components/             # Componentes React reutilizables
│   │   ├── ui/                 # Componentes UI atómicos (Button, Input, Modal…)
│   │   ├── layout/             # Componentes de estructura (Navbar, Sidebar…)
│   │   ├── forms/              # Formularios del sistema
│   │   └── charts/             # Gráficos y visualizaciones
│   │
│   ├── pages/                  # Páginas / vistas de la aplicación
│   │   ├── dashboard/          # Panel principal con KPIs
│   │   ├── clientes/           # Gestión de clientes
│   │   ├── ventas/             # Pipeline de ventas
│   │   ├── reportes/           # Reportes y estadísticas
│   │   └── configuracion/      # Ajustes del sistema
│   │
│   ├── hooks/                  # Custom Hooks de React (useClientes, useVentas…)
│   ├── services/               # Servicios de API (fetch calls por entidad)
│   ├── store/                  # Estado global (Zustand / Context)
│   ├── context/                # Contextos de React (AuthContext, ThemeContext…)
│   ├── types/                  # Interfaces y tipos TypeScript
│   ├── constants/              # Constantes globales (rutas, enums, config)
│   ├── utils/                  # Funciones utilitarias puras
│   ├── styles/                 # Estilos globales (index.css, App.css)
│   │
│   ├── App.tsx                 # Componente raíz con router
│   └── main.tsx                # Punto de entrada de la aplicación
│
├── .env.example                # Variables de entorno de referencia
├── .gitignore
├── index.html                  # HTML base
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## ⚙️ Instalación y Desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build

# 5. Previsualizar producción
npm run preview
```

---

## 🗂️ Convenciones del Proyecto

| Concepto | Convención |
|---------|-----------|
| Componentes | `PascalCase` (ej. `ClienteCard.tsx`) |
| Hooks | `camelCase` con prefijo `use` (ej. `useClientes.ts`) |
| Servicios | `camelCase` con sufijo `Service` (ej. `clientesService.ts`) |
| Constantes | `UPPER_SNAKE_CASE` |
| Tipos/Interfaces | `PascalCase` (ej. `Cliente`, `Venta`) |
| Páginas | Sufijo `Page` (ej. `ClientesPage.tsx`) |

---

## 📝 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|---------|-------------|------------------|
| `VITE_API_URL` | URL base del backend API | `/api` |

---

## 👥 Equipo

Proyecto académico — Computación CRM · SISTEMA-U
# SistemaCRM
