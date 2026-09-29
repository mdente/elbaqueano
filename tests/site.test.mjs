import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readProjectFile = (path) =>
  existsSync(resolve(projectRoot, path))
    ? readFileSync(resolve(projectRoot, path), "utf8")
    : "";

const html = readProjectFile("index.html");
const css = readProjectFile("styles.css");
const script = readProjectFile("script.js");

test("la portada declara español de Uruguay y metadatos propios", () => {
  assert.match(html, /<html[^>]+lang="es-UY"/i);
  assert.match(html, /<title>[^<]*Baqueano[^<]*<\/title>/i);
  assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]+"/i);
});

test("la navegación conduce a las secciones principales", () => {
  for (const id of ["que-es", "album", "experiencia", "contacto"]) {
    assert.match(html, new RegExp(`href="#${id}"`, "i"));
    assert.match(html, new RegExp(`id="${id}"`, "i"));
  }
});

test("la estructura incluye ayudas básicas de accesibilidad", () => {
  assert.match(html, /class="[^"]*skip-link[^"]*"[^>]+href="#contenido"/i);
  assert.match(html, /<main[^>]+id="contenido"/i);
  assert.match(html, /aria-label="[^"]+"/i);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});

test("todas las imágenes locales referenciadas existen", () => {
  const sources = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(
    ([, source]) => source,
  );

  assert.ok(sources.length >= 6, "se esperan por lo menos seis imágenes reales");
  for (const source of sources) {
    assert.equal(
      existsSync(resolve(projectRoot, decodeURI(source))),
      true,
      `no existe la imagen ${source}`,
    );
  }
});

test("los recursos y el dominio de GitHub Pages están configurados", () => {
  assert.match(html, /href="styles\.css"/i);
  assert.match(html, /src="script\.js"/i);
  assert.match(html, /href="favicon\.svg"/i);
  assert.equal(readProjectFile("CNAME").trim(), "elbaqueno.uy");
});

test("la hoja de estilos contempla teléfonos y movimiento reducido", () => {
  assert.match(css, /@media\s*\([^)]*max-width\s*:\s*[^)]+\)/i);
  assert.match(css, /overflow-x\s*:\s*(?:clip|hidden)/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion\s*:\s*reduce\)/i);
});

test("las imágenes conservan su proporción al cambiar de ancho", () => {
  assert.match(css, /img\s*{[^}]*height\s*:\s*auto/i);
});

test("el menú móvil contempla navegadores con la API anterior de matchMedia", () => {
  assert.match(script, /addEventListener/);
  assert.match(script, /addListener/);
});
