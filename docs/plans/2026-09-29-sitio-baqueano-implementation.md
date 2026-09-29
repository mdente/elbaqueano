# Sitio Baqueano Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Construir una página estática, accesible y lista para GitHub Pages que presente el álbum Baqueano con su identidad y fotografías reales.

**Architecture:** Sitio de una sola página servido directamente desde la raíz del repositorio. HTML semántico para contenido y navegación, CSS propio para dirección visual y respuesta adaptable, y JavaScript sin dependencias únicamente para el menú móvil y el año del pie.

**Tech Stack:** HTML5, CSS3, JavaScript ES2022, pruebas con `node:test`, GitHub Pages.

---

### Tarea 1: Contrato estructural del sitio

**Archivos:**
- Crear: `tests/site.test.mjs`
- Crear: `package.json`

**Paso 1: Escribir pruebas que exijan el idioma `es-UY`, metadatos, navegación, secciones principales, accesibilidad, dominio personalizado y referencias locales válidas.**

**Paso 2: Ejecutar `node --test tests/site.test.mjs`.**

Resultado esperado: falla porque todavía no existen `index.html`, `styles.css`, `script.js` ni `CNAME`.

### Tarea 2: Primera versión funcional

**Archivos:**
- Crear: `index.html`
- Crear: `styles.css`
- Crear: `script.js`
- Crear: `CNAME`
- Crear: `favicon.svg`

**Paso 1: Implementar la estructura semántica y el contenido completo en español del Uruguay.**

**Paso 2: Implementar la dirección visual «cuaderno de campo + álbum», navegación adaptable, foco visible y carga de imágenes optimizada.**

**Paso 3: Ejecutar `node --test tests/site.test.mjs`.**

Resultado esperado: todas las pruebas pasan.

### Tarea 3: Verificación visual y técnica

**Archivos:**
- Modificar, si corresponde: `index.html`, `styles.css`, `script.js`

**Paso 1: Servir la raíz del proyecto localmente y verificar respuesta HTTP correcta.**

**Paso 2: Revisar la página en anchos de escritorio y móvil, comprobando navegación, imágenes, legibilidad y ausencia de desbordamiento horizontal.**

**Paso 3: Ejecutar nuevamente la suite completa y revisar el estado de Git.**

Resultado esperado: respuesta HTTP 200, interfaz coherente en ambos tamaños y cero fallas de prueba.

### Tarea 4: Preparación del repositorio

**Archivos:**
- Crear: `README.md`
- Crear: `.gitignore`

**Paso 1: Documentar publicación en GitHub Pages y conexión del dominio mediante Cloudflare, sin credenciales.**

**Paso 2: Confirmar que `CNAME` contiene solamente `elbaqueno.uy`.**

**Paso 3: Registrar los cambios en Git con mensajes técnicos en español.**
