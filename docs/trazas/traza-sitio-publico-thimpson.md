# Traza de objetivo — Sitio público Thimpson Express (404 total → 20 páginas operativas)

**Fecha:** 2026-11-11 · **Lugar:** Ocotal, Nueva Segovia · **Autor:** ING. DENIS MANUEL LÓPEZ MOLINA.
**Proyecto:** `C:\xampp\htdocs\4-ThimpsonExpressAppWeb` · **Estado:** verificado y **sin commitear**.

## Resumen ejecutivo

El sitio devolvía 404 en **todas** las rutas por dos causas independientes: el router comparaba la
URI completa (con el subdirectorio de XAMPP) contra una tabla sin prefijo, y 16 de las 20 vistas
que los controladores incluían no existían. Se corrigió el router derivando el prefijo del propio
script, se crearon las 16 vistas con los datos de los modelos, se agregaron 6 rutas (5 con
parámetro) y se escribieron `app.js` y `mapa.js`. Verificación: 37 archivos sin errores de sintaxis,
25/25 casos HTTP con el código esperado, 32/32 enlaces internos en 200 y 0 errores de consola en 17
páginas. Queda pendiente el commit y la deuda de estilo legacy (57 archivos previos).

## 1. Objetivo y criterios de aceptación

| Criterio | Estado | Evidencia |
|---|---|---|
| Ninguna ruta del menú devuelve 404 | Cumplido | 25/25 casos HTTP (sección 7) |
| Las 20 vistas referenciadas existen | Cumplido | 20/20 `OK` |
| Métodos de controlador antes inalcanzables con ruta propia | Cumplido | 6 rutas nuevas (sección 5) |
| `app.js` ya no da 404 y las interacciones funcionan | Cumplido | 200 en red + pruebas de chat/top/form |
| Diseño y datos derivados de los modelos y de `custom.css` | Cumplido | Sin hex ni datos inventados |
| Sin dependencias nuevas | Cumplido | Sin cambios en `composer.json`/npm (no existen) |

## 2. Fases en orden cronológico real

### Fase 1 — Diagnóstico reproducible

- **Archivos:** ninguno modificado (solo lectura).
- **Hallazgo A:** `index.php` tomaba `$_SERVER['REQUEST_URI']` completo. Con la app en
  `htdocs/4-ThimpsonExpressAppWeb`, la URI real es `/4-ThimpsonExpressAppWeb/servicios`, que nunca
  coincide con la clave `/servicios` de la tabla → 404 incluso en `/`.
- **Hallazgo B:** 16 de 20 `include` apuntaban a archivos inexistentes. Con
  `display_errors = Off` en `C:\xampp\php\php.ini`, esto produce **página en blanco con HTTP 200**,
  no un error visible. Es la razón por la que el fallo parecía "mudo".
- **Hallazgo C:** `pieSitio.php:119` cargaba `app.js`, que no existía → 404 silencioso en consola.
- **Decisión:** no tocar la tabla de rutas (es la fuente de verdad) y no tocar `BASE_URL`
  (lo usan todas las vistas para enlazar).

### Fase 2 — Router

- **Archivo:** `index.php:20-32`.
- Se deriva el prefijo del propio script y se descuenta de la URI:

```php
$prefijoAplicacion = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');
if ($prefijoAplicacion !== '' && $prefijoAplicacion !== '/' && stripos($uri, $prefijoAplicacion) === 0) {
    $restoSinPrefijo = substr($uri, strlen($prefijoAplicacion));
    if ($restoSinPrefijo === '' || $restoSinPrefijo[0] === '/') {
        $uri = $restoSinPrefijo;
    }
}
```

- **Por qué así:** `dirname($_SERVER['SCRIPT_NAME'])` devuelve `/4-ThimpsonExpressAppWeb` con el
  docroot actual y `/` si el docroot pasara a ser la carpeta del proyecto. Un `str_replace(BASE_URL, ...)`
  habría atado el router a una constante que también está hardcodeada, duplicando el punto de falla.
- **Guarda:** la condición `$restoSinPrefijo[0] === '/'` evita falsos positivos de prefijo
  (`/app` vs `/application`).
- **Si alguien lo altera:** todas las rutas vuelven a 404. Es el punto más frágil del sitio.

### Fase 3 — Vistas (16 archivos)

- **Patrón respetado:** cada vista se auto-envuelve con `encabezadoSitio.php` / `pieSitio.php`;
  el controlador setea `$pageTitle` y `$activeMenu` antes del `include`.
- **Datos:** exclusivamente de `Modelos/*` (claves en inglés) y tokens de `custom.css`.
- **Escapado:** todo dato impreso pasa por `e()` (nuevo helper en `Configuracion/app.php:58`).
- **Si alguien las altera:** romper el contrato de plantillas (no incluir el encabezado) produce
  HTML sin `<head>`, sin navbar y sin los CDN; no da error PHP.

### Fase 4 — Rutas con parámetro y controladores

- **Archivos:** `index.php:38-52`, `Controladores/tiendaController.php`, `Controladores/rastreoController.php`.
- **Regla crítica:** el nombre del parámetro de ruta **debe** coincidir con el nombre del argumento
  del método (`{orderId}` → `show($orderId)`) porque `call_user_func_array` usa argumentos nombrados
  en PHP 8. Si no coincide: `ArgumentCountError` → fatal.
- **Filtro de marketplace:** `?categoria=` se valida contra `Negocio::getCategories()`;
  un valor inválido cae a `todos` (nunca se refleja en el HTML).
- **Búsqueda de rastreo:** `?codigo=` valida `is_string()` (evita el `TypeError` de `trim(array)`
  con `?codigo[]=`), busca con `Pedido::findById()` y redirige 302 con `rawurlencode()`.

### Fase 5 — JavaScript

- **`app.js`** (191 líneas): volver arriba, chat con respuesta por palabra clave y aviso de
  formularios `.form-demo`. Deriva la raíz del sitio desde `document.currentScript.src`, así que no
  depende de `BASE_URL` ni obligó a editar la plantilla.
- **`mapa.js`** (118 líneas): un solo archivo para rastreo y contacto; lee `data-*` del contenedor,
  dibuja origen/destino/rider, une con polyline y hace `fitBounds`. Si falta Leaflet o los datos,
  retorna sin error.
- **Si alguien renombra los `data-*`:** el mapa queda vacío sin avisar (falla silenciosa por diseño).

### Fase 6 — Documentación

- **`AGENTS.md`:** reescritas las secciones "Estado actual", "Trampa #1", "Patrones prohibidos" y
  "Verificación"; corregidas las referencias a números de línea que los banners corrieron
  (`app.php:26→36`, `index.php:67,77→93,103`); documentado que Apache escucha en `127.0.0.1:8080`.

### Fase 7 — Favicon "T" (pedido posterior)

- **Referencia:** se replicó el favicon del panel administrativo
  (`3-ThimpsonExpressPanelAdministrativo`): T negra sobre ámbar `#FBB03B`, rejilla 64.
- **Archivos:** `Publico/Recursos/img/favicon.svg`, `scripts/generar-favicon.php` (GD, produce
  `Publico/Recursos/img/favicon.ico` con 16/32/48 px y se autoverifica) y
  `Vistas/Plantillas/encabezadoSitio.php:8-9` (`rel="icon"` SVG + `rel="alternate icon"` ICO).
- **Hallazgo:** el SVG original no decodificaba. Causa exacta: el comentario XML contenía `--`
  (de `--primary`), y un `--` dentro de un comentario invalida el XML → el navegador no lo dibuja.
  Comprobado en el navegador con tres variantes: `original` falla, `sinDobleGuion` da 150×150,
  `conTamano` da 64×64. El SVG del panel administrativo **tiene el mismo defecto** y sigue roto.
- **Fix:** comentario reescrito sin guiones dobles y `width`/`height="64"` explícitos.
- **Verificación:** `favicon.svg` 200 / 621 b / decodifica 64×64; `favicon.ico` 200 / 532 b /
  decodifica 48×48; los dos `<link>` presentes en todas las rutas probadas; consola sin errores.
- **Si alguien lo altera:** volver a meter `--` en un comentario XML, o cambiar la geometría sin
  repetirla en `scripts/generar-favicon.php`, deja el icono roto o distinto entre SVG e ICO.

## 3. Archivos afectados

### Modificados

| Archivo | Punto central | Qué se rompe si se altera |
|---|---|---|
| `index.php` | `:24-32` descuento de prefijo; `:35-53` tabla de rutas; `:66` patrón `{param}`; `:117` dispatch | Todo el sitio vuelve a 404 o aparecen `ArgumentCountError` |
| `Configuracion/app.php` | `:23` `BASE_URL`; `:36` autoloader; `:58` `e()` | Enlaces de todas las vistas / autoload de modelos y controladores / escapado |
| `Controladores/tiendaController.php` | `:29-47` filtro; `:60-76` `show`; `:89-96` `register` | Filtro del marketplace y detalle de negocio |
| `Controladores/rastreoController.php` | `:29-53` búsqueda + 302; `:66-83` `show` | Búsqueda por código y página de seguimiento |
| `Vistas/Plantillas/encabezadoSitio.php` | `:8-9` `<link rel="icon">` SVG + ICO | Todas las páginas pierden el favicon |
| `AGENTS.md` | Secciones 2-5 | Solo documentación |

### Nuevos

| Archivo | Líneas | Rol |
|---|---|---|
| `Vistas/Servicios/index.php` | 66 | Grilla de los 7 servicios |
| `Vistas/Servicios/ver.php` | 95 | Detalle por slug + CTA WhatsApp |
| `Vistas/Marketplace/index.php` | 84 | Negocios + filtro por categoría |
| `Vistas/Marketplace/ver.php` | 115 | Detalle de negocio + productos |
| `Vistas/Marketplace/registrar.php` | 89 | Requisitos y planes para afiliarse |
| `Vistas/Suscripciones/planes.php` | 64 | 3 planes, uno marcado `popular` |
| `Vistas/Suscripciones/checkout.php` | 76 | Resumen del plan, sin cobro real |
| `Vistas/Suscripciones/facturacion.php` | 119 | 4 facturas mock + métodos de pago |
| `Vistas/Rastreo/index.php` | 87 | Buscador + pedidos recientes |
| `Vistas/Rastreo/ver.php` | 150 | Pasos, mapa y rider |
| `Vistas/Nosotros/index.php` | 150 | Historia, valores, testimonios |
| `Vistas/Contacto/index.php` | 92 | Teléfonos, WhatsApp y mapa |
| `Vistas/Galeria/index.php` | 47 | Galería de imágenes mock |
| `Vistas/Autenticacion/login.php` | 49 | Formulario `.form-demo` |
| `Vistas/Autenticacion/recuperar.php` | 40 | Formulario `.form-demo` |
| `Vistas/Autenticacion/suscribir.php` | 80 | Formulario `.form-demo` |
| `Publico/Recursos/js/app.js` | 191 | Interacciones comunes |
| `Publico/Recursos/js/mapa.js` | 118 | Leaflet para rastreo y contacto |
| `Publico/Recursos/img/favicon.svg` | 11 | T ámbar/negra, rejilla 64 (icono moderno) |
| `Publico/Recursos/img/favicon.ico` | binario (532 b) | 16/32/48 px generados por GD |
| `scripts/generar-favicon.php` | 137 | Genera y autoverifica el `.ico` |

## 4. Contratos

### Rutas

| Método | Ruta | Controlador@método | Respuesta |
|---|---|---|---|
| GET | `/` | `inicioController@index` | 200 |
| GET | `/servicios` | `servicioController@index` | 200 |
| GET | `/servicios/{slug}` | `servicioController@show` | 200 / 404 |
| GET | `/marketplace` (`?categoria=`) | `tiendaController@index` | 200 |
| GET | `/marketplace/registro` | `tiendaController@register` | 200 |
| GET | `/marketplace/{slug}` | `tiendaController@show` | 200 / 404 |
| GET | `/planes` | `suscripcionController@plans` | 200 |
| GET | `/planes/{planId}/checkout` | `suscripcionController@checkout` | 200 / 404 |
| GET | `/cuenta/facturacion` | `suscripcionController@billing` | 200 |
| GET | `/rastrear` (`?codigo=`) | `rastreoController@index` | 200 / 302 |
| GET | `/rastrear/{orderId}` | `rastreoController@show` | 200 / 404 |
| GET | `/login`, `/recuperar`, `/suscribir` | `autenticacionController@*` | 200 |
| GET | `/nosotros`, `/contacto`, `/galeria` | `estaticoController@*` | 200 |
| — | cualquier otra | — | 404 con `Vistas/Errores/404.php` |

### Contrato de vistas

- El controlador define `$pageTitle` y `$activeMenu` **antes** del `include`.
- `$extraJs = [BASE_URL . '/Publico/Recursos/js/x.js']` antes de `pieSitio.php` (rutas completas).
- Todo dato de modelo se imprime con `e()`.
- El parche 404 se copia textual y termina en `return;` (sin él, doble footer).

### Data-* del mapa (`mapa.js`)

`data-centro-lat`, `data-centro-lng`, `data-zoom`, `data-origen-lat/lng/nombre`,
`data-destino-lat/lng/nombre`, `data-rider-lat/lng/nombre` (opcional).
Contenedor: `#mapa-rastreo` o `#mapa-contacto`.

## 5. Reglas de negocio y seguridad aplicadas

- **Escapado de salida:** `e()` = `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')` en todas las vistas nuevas.
- **Validación en servidor:** `?categoria=` contra la lista blanca de `Negocio::getCategories()`;
  `?codigo=` con `is_string()`; slugs y planes resueltos contra los modelos (404 si no existen).
- **Sin SQL:** el proyecto es 100 % mock; no se agregó PDO ni mysqli (regla del repo).
- **Sin dinero en float:** los precios se muestran con `number_format()` sobre enteros del modelo.
- **Sin secretos:** solo teléfonos públicos de la empresa, ya presentes en `Configuracion/app.php`.
- **Sin simulación de auth ni pagos:** los formularios avisan "disponible próximamente" y derivan a
  WhatsApp; el checkout declara explícitamente que no se procesan pagos en línea.

## 6. Pruebas realizadas (comandos exactos)

```powershell
# 1. Sintaxis
Get-ChildItem -Recurse -Filter *.php | ForEach-Object { php -l $_.FullName }
# -> 37 archivos revisados | con error de sintaxis: 0

# 2. Vistas referenciadas
$views = rg -o "VIEW_PATH \. '([^']+)'" -r '$1' --no-filename Controladores index.php | Sort-Object -Unique
# -> Total: 20 | faltantes: 0

# 3. Barrido HTTP
$base='http://127.0.0.1:8080/4-ThimpsonExpressAppWeb'
# -> Casos: 25 | inesperados: 0

# 4. Redirect de búsqueda
curl.exe -s -o NUL -D - "$base/rastrear?codigo=TEX-2026-0847"
# -> HTTP/1.1 302 Found
#    Location: /4-ThimpsonExpressAppWeb/rastrear/TEX-2026-0847

# 5. Guardián de estilo (archivos nuevos)
pwsh ~/.config/opencode/scripts/validar-estilo.ps1 -Ruta . -SoloNuevos
# -> 0 error(es), 0 aviso(s), 0 nota(s)
# Nota: -SoloNuevos NO ve archivos sin trackear. Corrido completo:
# -> 57 errores, todos en archivos legacy previos; 0 en las 16 vistas y 2 JS nuevos.
```

**En navegador (Playwright, Chromium, 1440×900), evidencia:**

| Prueba | Resultado |
|---|---|
| Errores de consola en 17 páginas | 0 (el único 404 es el documento en una ruta inexistente) |
| Recursos de la home | 28 peticiones, todas 200 (`custom.css`, `app.js`, CDNs) |
| `#backToTop` a 1192px de scroll | `display: flex`; al click vuelve a 0 y se oculta |
| Chat: abrir + enviar "quiero rastrear mi pedido" | Widget `.active`; burbuja user + respuesta bot con el enlace |
| `form.form-demo` (login, campos completos) | SweetAlert "Disponible próximamente"; la URL no cambia |
| `/marketplace?categoria=comida` | 1 tarjeta; chip activo "Comida (1)" |
| `/marketplace?categoria=basura` | 3 tarjetas (cae a todos) |
| `/rastrear/TEX-2026-0847` | Rider María Torres, mapa Leaflet, 4 pasos (3 completos + 1 activo), 3 marcadores |
| `/rastrear/TEX-2026-0849` | "Pendiente", mensaje "Todavía no hay un rider asignado", mapa OK |
| `/planes` | 3 `.plan-card`, 1 `.popular` |
| `/cuenta/facturacion` | 4 filas de facturas |
| `/contacto` | Mapa Leaflet, 5 enlaces WhatsApp, 4 `tel:` |
| XSS en `?codigo=`, `?categoria=`, slugs | Escapado (`&lt;script&gt;`) o descartado; 0 reflejado crudo |
| Enlaces internos crawleados | 32 únicos → 32/32 en 200 |

## 7. Decisiones y alternativas descartadas

| Decisión | Alternativa descartada | Motivo |
|---|---|---|
| Prefijo desde `dirname(SCRIPT_NAME)` | `str_replace(BASE_URL, '', $uri)` | No duplica el punto de falla; funciona con otro docroot |
| Tabla de rutas intacta | Reescribir rutas con prefijo | Las vistas ya enlazan con `BASE_URL`; cambiarla obligaba a tocar 20 vistas |
| `e()` global | Escapar a mano en cada eco | Un solo lugar para auditar; evita olvidos |
| Un `mapa.js` compartido | Un JS por página | Una implementación, dos vistas; menos código que mantener |
| `document.currentScript.src` para la raíz | Editar `pieSitio.php` con `BASE_URL` | La plantilla no se tocó; el JS es agnóstico del despliegue |
| Formularios `.form-demo` con aviso | Simular login/pago exitoso | No se puede mentir al usuario ni fingir seguridad inexistente |
| CTA a WhatsApp en checkout/contacto | Formularios POST falsos | No hay backend; un POST sin destino es peor UX |

## 8. Deuda y riesgos pendientes

1. **Sin commitear.** Todo está en el working tree; el hook `post-commit` hace push automático,
   así que conviene revisar antes de `git save`.
2. **Deuda de estilo legacy:** el guardián completo marca **57 errores** en archivos previos
   (todos los `Modelos/*`, `Controladores/{autenticacion,estatico,inicio,servicio,suscripcion}`,
   `Vistas/Plantillas/*`, `Vistas/Inicio/index.php`, `Vistas/Errores/404.php`, `custom.css`).
   No se tocaron: son anteriores a esta tarea y refactorizarlos excede el pedido.
3. **Bug cosmético preexistente:** `Vistas/Inicio/index.php:41` usa `background:var(--surface-3)`,
   token que no existe en `custom.css` → la caja del icono queda transparente. Fix de una línea
   (definir el token o usar `--background`), pendiente de autorización.
4. **Sin capa de sesión, POST ni CSRF.** Cualquier trabajo de auth arranca de cero; hoy los
   formularios solo informan.
5. **`e()` no valida tipo:** pasarle un array dispararía "Array to string conversion". Hoy ningún
   llamador lo hace; si se agregan, conviene endurecerlo con `is_scalar`.
6. **Riesgo del router:** si alguien "simplifica" el bloque de prefijo, el sitio entero cae a 404.
   Documentado en `AGENTS.md` como trampa explícita.
7. **`AGENTS.md` es documentación viva:** si se agregan rutas o vistas, actualizarlo o vuelve a mentir.
8. **Favicon del panel administrativo roto:** `3-ThimpsonExpressPanelAdministrativo/Publico/Recursos/img/favicon.svg`
   tiene el mismo `--` dentro del comentario XML y no decodifica. Se corrigió solo el de la app web;
   el del panel queda pendiente de autorización (fix de una línea, mismo criterio).

## 9. Cómo reproducir

```powershell
# Apache de XAMPP debe estar arriba (escucha en 127.0.0.1:8080, no en el 80)
curl.exe -s -o NUL -w "%{http_code}" http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/
# 200

# Páginas clave
start http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/
start http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/servicios
start http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/marketplace/sabor-criollo
start http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/rastrear/TEX-2026-0847
```

Datos de prueba disponibles: pedidos `TEX-2026-0847` (con rider), `TEX-2026-0849` (sin rider),
`TEX-2026-0851`; planes `free`, `pro`, `empresarial`; negocios `sabor-criollo`,
`farmacia-divina-providencia`, `supermercado-central`; servicios `mandado`, `delivery`,
`encomienda`, `viaje-expreso`, `transporte`, `acarreo`, `mudanza`.
