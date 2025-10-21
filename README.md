# iCREAM - Heladería React One Page

Un proyecto React moderno basado en la plantilla iCREAM, convertido a una página única con Tailwind CSS para heladerías tradicionales.

## 🚀 Características

- ⚡ **Vite** - Build tool ultra rápido
- ⚛️ **React 18** - Framework de JavaScript moderno
- 🎨 **Tailwind CSS** - Framework de CSS utilitario
- 📱 **Responsive Design** - Adaptable a todos los dispositivos
- 🎯 **One Page** - Diseño de página única con navegación suave
- 🍦 **Tema Heladería** - Diseño específico para heladerías tradicionales
- 🎨 **Diseño Moderno** - UI/UX atractiva con colores pastel
- 🖼️ **Galería de Imágenes** - Portfolio de productos
- 🎬 **Video Modal** - Reproducción de videos promocionales
- 🛒 **Catálogo de Productos** - Showcase de helados

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Previsualizar build de producción:**
   ```bash
   npm run preview
   ```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en http://localhost:3000
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción

## 📁 Estructura del Proyecto

```
├── public/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales con Tailwind
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
└── vite.config.js       # Configuración de Vite
```

## 🎨 Personalización

### Colores
Los colores principales se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Componentes
Se pueden crear componentes reutilizables en la carpeta `src/components/`.

## 📱 Secciones Incluidas

- **Topbar** - Enlaces rápidos y redes sociales
- **Header** - Navegación responsive con menú móvil
- **Hero Carousel** - Carrusel de imágenes con autoplay
- **Sobre Nosotros** - Historia y características de la heladería
- **Promoción** - Sección especial con video modal
- **Servicios** - Servicios de la heladería con imágenes
- **Galería** - Portfolio de productos y ambiente
- **Productos** - Catálogo de helados con precios
- **Equipo** - Chefs y personal de la heladería
- **Testimonios** - Opiniones de clientes
- **Contacto** - Formulario de contacto
- **Footer** - Enlaces y información de contacto

## 🚀 Despliegue

El proyecto está listo para desplegar en cualquier plataforma que soporte aplicaciones estáticas:

- **Vercel**: `vercel --prod`
- **Netlify**: Arrastra la carpeta `dist` después de `npm run build`
- **GitHub Pages**: Usa GitHub Actions para automatizar el despliegue

## 📄 Licencia

MIT License - Libre para uso personal y comercial.
