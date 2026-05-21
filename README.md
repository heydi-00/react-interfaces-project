# STIMI — Sistema de Trazabilidad de Informes Mensuales de Instructores

## Instalación

```bash
npm install
npm run dev
```

## Credenciales demo

| Usuario | Contraseña | Rol |
|---|---|---|
| instructor | 123 | Instructor |
| coordinador | 123 | Coordinador |

## Estructura del proyecto

```
src/
  styles/          ← Estilos CSS separados de los componentes
    index.css      ← Punto de entrada (imports)
    theme.css      ← Variables CSS (colores, radios, sidebar)
    globals.css    ← Base layer, tipografía, body
  components/
    ui/            ← Componentes shadcn/ui (48 componentes)
    instructor/    ← Vistas del instructor
    coordinator/   ← Vistas del coordinador
    Login.jsx
    Sidebar.jsx
  App.jsx
  main.jsx
```
