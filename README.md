# 🧱 Rompebloques Premium

> **Juego arcade 2D estilo Breakout / Arkanoid con renderizado en tiempo real a 60 FPS.**

Rompebloques Premium es una recreación moderna del clásico arcade de romper ladrillos, construido desde cero con HTML5 Canvas y JavaScript puro. Ofrece una experiencia de juego ágil con controles responsivos adaptados para teclado, ratón y pantallas táctiles.

---

## ✨ Características

* **⚡ Alto rendimiento (60 FPS):** Motor de física y dibujo en 2D optimizado con `window.requestAnimationFrame`.
* **🕹️ Controles multiplataforma:**
  * **Teclado:** Flechas izquierda y derecha (`←` / `→`).
  * **Ratón:** Movimiento horizontal continuo del cursor.
  * **Táctil / Móvil:** Arrastre con el dedo en pantallas táctiles (`touchmove`).
* **💥 Mecánica de colisiones precisa:** Cálculo vectorial para el rebote de la bola contra la paleta, paredes del escenario y la matriz de bloques.
* **💯 Puntuación y Vidas:**
  * +10 puntos por cada bloque destruido.
  * 3 vidas por partida.
  * Matriz de 45 bloques distribuidos en 5 filas y 9 columnas.
* **🏆 Pantallas de estado:** Pantalla inicial con botón de inicio, mensaje de *Game Over* si pierdes todas tus vidas y celebración al completar todos los bloques.
* **↩️ Retorno rápido al Hub:** Enlace en el encabezado para volver al catálogo de juegos.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Canvas:** Renderizado dinámico 2D en lienzo `<canvas width="800" height="600">`.
* **CSS3:** Contenedor responsivo, interfaz centrada y diseño minimalista oscuro con contrastes en rosa y azul eléctrico.
* **JavaScript Vanilla (ES6+):** Bucle de juego (*game loop*), detección de colisiones AABB y gestión de eventos de entrada.

---

## 🎮 Controles

| Método | Acción |
| :--- | :--- |
| **Flecha Izquierda / Derecha** | Mover la paleta hacia los lados |
| **Cursor del Ratón** | Mover la paleta siguiendo el puntero |
| **Deslizar en Pantalla** | Mover la paleta con el dedo en móviles |
| **Botón Jugar** | Iniciar o reiniciar la partida |

---

## 🚀 Ejecución Local

Puedes ejecutar el juego de forma independiente abriéndolo directamente en tu navegador:

```bash
# Abrir directamente en macOS:
open index.html
```

O si estás dentro del proyecto raíz **Game Hub**:
```bash
make serve
```
Y navega a `http://localhost:8080/games/rompebloques/index.html`.

---

## 📁 Archivos del Proyecto

```text
rompebloques/
├── index.html       # Lienzo Canvas, marcadores de vidas y puntos
├── index.css        # Estilos visuales del contenedor y overlay
├── app.js           # Bucle principal, colisiones, entrada de usuario y render
└── README.md        # Documentación del proyecto
```

---

## 👤 Autor

Desarrollado por **[Diego Cruz](https://github.com/DiegoCruzzz)**.
