# Post-contenido — Unidad 3: CSS3 Básico

## Descripción

Repositorio del laboratorio de la Unidad 3 de Programación Web —
Séptimo Semestre.

Contiene dos partes:

- Página de perfil con selectores CSS avanzados, Box Model y posicionamiento.
- Dashboard responsivo utilizando CSS Grid y Flexbox.

---

## Parte 1 — Página de perfil

Página de perfil personal que implementa:

- Selectores CSS avanzados.
- box-sizing: border-box.
- Posicionamiento fixed, relative y absolute.
- Escala de espaciado mediante Custom Properties.
- Tipografía fluida mediante clamp().
- Formulario de contacto accesible.
- Estados :focus.

Los archivos correspondientes se encuentran en:

parte-1-perfil-css3/

---

## Parte 2 — Dashboard con Grid y Flexbox

Dashboard web responsivo desarrollado utilizando únicamente CSS3,
sin frameworks externos.

La implementación incluye:

- CSS Grid para la estructura principal.
- grid-template-areas para organizar sidebar, topbar y contenido.
- Flexbox para el sidebar.
- Flexbox para el topbar.
- Grid responsivo mediante auto-fill y minmax().
- Tarjetas estadísticas responsivas.
- Panel principal con proporción 2fr 1fr.
- Panel lateral de actividad.
- Panel "Notas del Sprint".
- Colocación explícita mediante grid-column: 1 / -1.
- Tabla de proyectos.
- Franjas zebra mediante :nth-child(even).
- Efecto :hover sobre las filas.
- Badges para los estados de los proyectos.
- Diseño adaptable para pantallas pequeñas.

Los archivos correspondientes se encuentran en:

parte-2-dashboard-grid/

---

# Decisiones de diseño

## Parte 1 — Estrategia de especificidad para validación

Para la validación del formulario se utilizó una estrategia basada en
selectores específicos para los campos inválidos, evitando el uso de
!important.

La estrategia permite mantener la regla de estado :focus y controlar
la apariencia de los campos mediante una especificidad adecuada.

---

## Parte 2 — Breakpoint y estrategia de layout responsivo

### Breakpoint elegido

Se eligió un breakpoint de *700px*.

Este valor fue seleccionado después de probar el dashboard mediante
Chrome DevTools utilizando el modo de dispositivos.

Por encima de 700px el sidebar lateral y la distribución de contenido
en dos columnas proporcionan suficiente espacio para mostrar la
información de forma cómoda.

Por debajo de 700px, el sidebar fijo de 220px y la distribución 2fr 1fr
reducen demasiado el espacio disponible, especialmente en dispositivos
móviles.

### Estrategia elegida

Se utilizó la estrategia *CSS Grid*.

En el breakpoint se redefine el layout principal:

- Se utiliza una sola columna.
- El sidebar pasa a ocupar una franja horizontal.
- El topbar aparece debajo del sidebar.
- El contenido principal aparece después del topbar.
- El panel de contenido pasa de 2fr 1fr a 1fr.

Se prefirió Grid sobre la estrategia Flex porque permite conservar las
áreas semánticas definidas originalmente mediante:

- sidebar
- topbar
- main

De esta forma se mantiene una estructura clara y se reorganiza el
dashboard sin modificar la asignación principal de las áreas.

---

# Cómo visualizar el proyecto

1. Clonar el repositorio:

git clone https://github.com/cristianSaavedraCardona/saavedra-post1-u3.git

2. Abrir la carpeta en Visual Studio Code.

3. Abrir:

parte-1-perfil-css3/index.html

para visualizar la Parte 1.

4. Abrir:

parte-2-dashboard-grid/index.html

para visualizar la Parte 2.

5. Utilizar la extensión Live Server de VS Code.

---

# Tecnologías utilizadas

- HTML5
- CSS3
- CSS Grid
- Flexbox
- Custom Properties
- Responsive Design
- Chrome DevTools
- Visual Studio Code
- Git
- GitHub

---

# Estructura del proyecto

```text
cardona-post1-u3/
├── parte-1-perfil-css3/
│   └── index.html
│
├── parte-2-dashboard-grid/
│   ├── index.html
│   └── css/
│       └── dashboard.css
│
├── .gitignore
└── README.md