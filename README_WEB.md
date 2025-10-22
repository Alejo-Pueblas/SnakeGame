# Snake Game - Versión Web

Juego clásico de Snake convertido a una aplicación web usando HTML5, CSS3 y JavaScript vanilla.

## 🎮 Características

- Juego Snake clásico con controles de teclado
- Diseño responsivo que funciona en diferentes tamaños de pantalla
- Velocidad progresiva que aumenta con el puntaje
- Interfaz moderna con gradientes y sombras
- Pantalla de Game Over con opción de reinicio

## 🚀 Cómo jugar localmente

1. Abre el archivo `index.html` en tu navegador web
2. Usa las flechas del teclado para controlar la serpiente:
   - ⬆️ Flecha arriba: Mover hacia arriba
   - ⬇️ Flecha abajo: Mover hacia abajo
   - ⬅️ Flecha izquierda: Mover hacia la izquierda
   - ➡️ Flecha derecha: Mover hacia la derecha
3. Come la comida roja para crecer y aumentar tu puntaje
4. Evita chocar con las paredes o con tu propio cuerpo
5. Cuando pierdas, presiona ESPACIO para reiniciar

## 📦 Despliegue en GitHub Pages

### Opción 1: Desde la interfaz web de GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube los siguientes archivos:
   - `index.html`
   - `game.js`
   - `style.css`
3. Ve a Settings → Pages
4. En "Source", selecciona la rama `main` y la carpeta `/ (root)`
5. Haz clic en "Save"
6. Tu juego estará disponible en: `https://tu-usuario.github.io/nombre-repositorio/`

### Opción 2: Desde la línea de comandos

```bash
# Inicializar repositorio Git (si no existe)
git init

# Agregar archivos web
git add index.html game.js style.css README_WEB.md

# Hacer commit
git commit -m "Versión web del Snake Game"

# Conectar con tu repositorio remoto
git remote add origin https://github.com/tu-usuario/snake-game.git

# Subir cambios
git push -u origin main
```

Luego activa GitHub Pages desde la configuración del repositorio.

## 🌐 Despliegue en Render

1. Crea una cuenta en [Render](https://render.com)
2. Haz clic en "New +" → "Static Site"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build Command**: (dejar vacío)
   - **Publish Directory**: `.` (punto)
5. Haz clic en "Create Static Site"
6. Tu juego estará disponible en la URL proporcionada por Render

## 🌐 Otras opciones de despliegue gratuito

- **Netlify**: Arrastra y suelta los archivos en [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: Conecta tu repositorio en [vercel.com](https://vercel.com)
- **Cloudflare Pages**: Despliega desde GitHub en [pages.cloudflare.com](https://pages.cloudflare.com)

## 📁 Estructura de archivos

```
SnakeGame/
├── index.html      # Estructura HTML principal
├── game.js         # Lógica del juego en JavaScript
├── style.css       # Estilos y diseño
└── README_WEB.md   # Este archivo
```

## 🎨 Personalización

Puedes personalizar el juego editando las constantes en `game.js`:

```javascript
const WINDOW_WIDTH = 600;      // Ancho del canvas
const WINDOW_HEIGHT = 400;     // Alto del canvas
const CELL_SIZE = 20;          // Tamaño de cada celda
const FPS_START = 4;           // Velocidad inicial
const FPS_MAX = 15;            // Velocidad máxima
const FPS_INCREMENT = 0.5;     // Incremento de velocidad
```

También puedes cambiar los colores modificando las variables de color en `game.js`.

## 🔧 Tecnologías utilizadas

- HTML5 Canvas para renderizado
- JavaScript ES6+ (clases, arrow functions, etc.)
- CSS3 (flexbox, gradientes, animaciones)
- RequestAnimationFrame para el loop del juego

## 📝 Notas

- La versión original en Python/Pygame se encuentra en los archivos `.py`
- Esta versión web es completamente independiente y no requiere Python
- El juego funciona completamente en el navegador sin necesidad de servidor

## 🐛 Solución de problemas

Si el juego no funciona:
1. Asegúrate de que los tres archivos (`index.html`, `game.js`, `style.css`) estén en la misma carpeta
2. Abre la consola del navegador (F12) para ver posibles errores
3. Verifica que estés usando un navegador moderno (Chrome, Firefox, Edge, Safari)

---

¡Disfruta del juego! 🐍
