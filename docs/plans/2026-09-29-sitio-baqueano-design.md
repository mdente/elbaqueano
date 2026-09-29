# Diseño del sitio Baqueano

## Objetivo

Crear la primera presencia web pública de Baqueano, un álbum de figuritas dedicado a la fauna autóctona del Uruguay. El sitio debe presentar el proyecto con una identidad propia, mostrar su uso real por niñas y niños y quedar listo para publicarse en GitHub Pages bajo el dominio `elbaqueno.uy`.

## Público y recorrido principal

El público inicial está compuesto por familias, educadores y personas interesadas en naturaleza y educación. La página debe permitir comprender rápidamente qué es Baqueano, ver el álbum en uso y encontrar una vía clara para seguir el proyecto o ponerse en contacto cuando se incorporen los datos definitivos.

## Dirección visual

La tesis visual es «cuaderno de campo convertido en álbum de figuritas». La interfaz combina verde monte, amarillo intenso, negro y tonos tierra tomados de la marca. Los bloques de contenido se presentan como fichas de exploración, estampas y páginas de cuaderno, con bordes fuertes y sombras cortas. Las fotografías reales aportadas por el proyecto son el material visual principal; no se generarán animales, productos ni testimonios inexistentes.

## Estructura

1. Encabezado compacto con marca y navegación por anclas.
2. Portada con propuesta central, llamado a conocer el álbum y composición fotográfica.
3. Sección «¿Qué es Baqueano?» con tres principios: observar, aprender y compartir.
4. Muestra del álbum mediante fotografías reales y fichas de fauna suministradas.
5. Sección de experiencia real con niñas y niños usando el álbum.
6. Cierre comunitario y área de contacto sin datos inventados.
7. Pie con identidad, ubicación Uruguay y año dinámico.

## Arquitectura y comportamiento

El sitio será estático, sin dependencias externas ni proceso de compilación. Se utilizarán HTML semántico, CSS responsivo y JavaScript mínimo para el menú móvil y mejoras progresivas. Las imágenes permanecerán como archivos locales del repositorio. La publicación se realizará directamente desde la raíz en GitHub Pages, con archivo `CNAME` para el dominio personalizado.

## Accesibilidad y rendimiento

- Idioma documental `es-UY` y redacción natural de Montevideo.
- Navegación operable con teclado, enlace para saltar al contenido y foco visible.
- Texto principal de 16 px o más y contraste suficiente.
- Imágenes con dimensiones declaradas, texto alternativo y carga diferida fuera de portada.
- Diseño adaptable desde teléfonos pequeños hasta pantallas de escritorio, sin desplazamiento horizontal.

## Supuestos y pendientes

- Se usa exactamente el dominio informado: `elbaqueno.uy`.
- No se publican precios, cantidades, teléfonos, correos, escuelas ni redes sociales hasta recibir datos confirmados.
- Las fotografías aportadas se consideran autorizadas para esta primera implementación; la autorización de publicación debe validarse antes del lanzamiento público.
- La primera versión es una página única. Se podrán agregar tienda, catálogo o red de padrinos en etapas posteriores.
