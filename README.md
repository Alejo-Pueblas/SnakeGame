# 🐍 Snake Game - Estilo Retro

Juego clásico de Snake con estética retro estilo Game Boy, implementado en Python usando Pygame.

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Pygame](https://img.shields.io/badge/Pygame-2.x-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Descripción

Un Snake Game con diseño retro que captura la esencia del clásico juego. Incluye velocidad progresiva, colores estilo Game Boy y una jugabilidad fluida y adictiva.

## ✨ Características

- 🎨 **Estilo retro clásico** con paleta de colores verde estilo Game Boy
- 🎯 **Patrón de tablero** tipo ajedrez para el fondo
- ⚡ **Velocidad progresiva** - empieza lento (4 FPS) y acelera hasta 15 FPS
- 🐍 **Serpiente con bordes** para mejor definición visual
- 🍎 **Comida con efecto 3D** (resaltado)
- 🔄 **Sistema de reinicio** instantáneo con ESPACIO
- 💯 **Sistema de puntaje** en tiempo real
- 🎮 **Controles intuitivos** con teclas de flecha
- 📱 **Pantalla Game Over** elegante con opciones claras

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Alejo-Pueblas/SnakeGame.git
cd SnakeGame
```

2. Instala las dependencias:
```bash
pip install pygame
```

O usando el archivo de requisitos:
```bash
pip install -r requirements.txt
```

## 🎮 Cómo Jugar

1. Ejecuta el juego:
```bash
python main.py
```

2. **Controles:**
   - `↑` `↓` `←` `→` - Mover la serpiente
   - `ESPACIO` - Reiniciar después de Game Over
   - `ESC` - Salir del juego

3. **Objetivo:**
   - Come la comida roja para crecer y aumentar tu puntaje
   - Evita chocar con las paredes
   - Evita chocar con tu propio cuerpo
   - ¡Consigue el puntaje más alto!

## 📁 Estructura del Proyecto

```
SnakeGame/
├── main.py          # Punto de entrada del juego
├── game.py          # Lógica principal y bucle del juego
├── snake.py         # Clase Snake (movimiento, colisiones)
├── food.py          # Clase Food (generación aleatoria)
├── settings.py      # Configuración y constantes
├── utils.py         # Funciones auxiliares
├── requirements.txt # Dependencias del proyecto
└── README.md        # Documentación
```

## ⚙️ Configuración

Personaliza el juego editando `settings.py`:

```python
WINDOW_WIDTH = 600        # Ancho de ventana
WINDOW_HEIGHT = 400       # Alto de ventana
CELL_SIZE = 20           # Tamaño de celda

FPS_START = 4            # Velocidad inicial
FPS_MAX = 15             # Velocidad máxima
FPS_INCREMENT = 0.5      # Incremento por comida

# Colores personalizables (RGB)
BG_COLOR = (170, 215, 81)        # Fondo
SNAKE_COLOR = (43, 89, 18)       # Serpiente
FOOD_COLOR = (204, 51, 51)       # Comida
```

## 🎯 Mecánicas del Juego

- **Velocidad Progresiva**: El juego empieza lento y acelera gradualmente con cada comida
- **Colisiones**: Game Over al chocar con paredes o el propio cuerpo
- **Crecimiento**: La serpiente crece un segmento por cada comida
- **Puntaje**: +1 punto por cada comida consumida

## 🛠️ Tecnologías

- **Python 3.x** - Lenguaje de programación
- **Pygame 2.x** - Librería de desarrollo de juegos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Alejo Pueblas**
- GitHub: [@Alejo-Pueblas](https://github.com/Alejo-Pueblas)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el juego:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

⭐ Si te gustó el proyecto, dale una estrella en GitHub!
