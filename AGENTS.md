# AGENTS.md — Thimpson Express (App Web)

Sitio público de Thimpson Express (delivery/mandados en Ocotal, Nicaragua).
MVC en PHP **sin dependencias**: sin `composer.json`, sin npm, sin build, sin base de
datos, sin tests. Todo el CSS/JS entra por CDN de Bootstrap 5.

## Comandos

| Qué | Cómo |
|---|---|
| Lint (única verificación automatizada) | `Get-ChildItem -Recurse -Filter *.php \| ForEach-Object { php -l $_.FullName }` |
| Servir | Apache de XAMPP: `http://localhost/4-ThimpsonExpressAppWeb` (requiere `mod_rewrite` + `AllowOverride All` en `C:\xampp\apache\conf\httpd.conf`); no hay `server.php` ni artisan |

No existen `composer test`, `npm test`, PHPUnit ni workflows de CI. No los inventes.

## Estado actual — leer antes de prometer nada

La migración a MVC está en **Fase 1** (commit `b3f5b47`). El esqueleto está completo,
las páginas no:

- **Solo existe 1 de las 20 vistas** que los controladores incluyen: `Vistas/Inicio/index.php`
  (más `Vistas/Errores/404.php` y las dos plantillas). Cualquier ruta salvo `/` produce
  `Failed opening required .../Vistas/<Carpeta>/<archivo>.php`.
  Chequeo reproducible: `rg -o "VIEW_PATH \. '([^']+)'" -r '$1' --no-filename Controladores index.php`
- **`Publico/Recursos/js/app.js` no existe**, pero `Vistas/Plantillas/pieSitio.php:119` lo
  referencia. Todas las páginas dan 404 en ese script; chat, back-to-top y SweetAlert no funcionan.
  `Publico/Recursos/js/` está vacía.
- **5 métodos de controlador son inalcanzables**: `tiendaController::show`,
  `servicioController::show`, `rastreoController::show`, `suscripcionController::checkout`,
  `suscripcionController::billing`. El router ya soporta `{param}` (`index.php:40`) pero
  ninguna ruta lo usa.
- **No existe `session_start()`, ni manejo de POST, ni CSRF, ni capa de auth** en ningún archivo.
  `autenticacionController` solo renderiza formularios. Cualquier trabajo de auth arranca de cero.

## Trampa #1 — el router no matchea bajo el subdirectorio

`index.php:10` compara `$_SERVER['REQUEST_URI']` **completo** contra un tabla de rutas
sin prefijo (`/servicios`). Como la app vive en `htdocs/4-ThimpsonExpressAppWeb`, la URI real
es `/4-ThimpsonExpressAppWeb/servicios` → nunca coincide → 404 en todas las rutas, incluso `/`.

```
/4-ThimpsonExpressAppWeb/           -> uri=/4-ThimpsonExpressAppWeb        -> 404
/servicios                          -> uri=/servicios                       -> servicioController
```

`BASE_URL` (`Configuracion/app.php:13`) está hardcodeado a `/4-ThimpsonExpressAppWeb` y las
vistas lo usan para todos los enlaces, así que el prefijo no es opcional: el fix es quitar
`BASE_URL` de `$uri` antes del `rtrim` (p. ej. `str_starts_with`), no cambiar la tabla de rutas.
Solo funciona hoy si el docroot de Apache es esta carpeta.

## Contrato de vistas

- Las vistas son `include` pelados (sin `$this`, sin función, sin layout automático).
- Cada vista se envuelve a sí misma:
  ```php
  <?php include VIEW_PATH . '/Plantillas/encabezadoSitio.php'; ?>
  ... contenido ...
  <?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
  ```
- El controlador debe setear `$pageTitle` y `$activeMenu` **antes** del include; las plantillas
  los leen (`encabezadoSitio.php:7`, `:58`). `$activeMenu` debe coincidir con el id del link.
- Para JS específico de página: `$extraJs = ['...']` antes de incluir `pieSitio.php`.
- Patrón 404 repetido inline en cada controlador — copiarlo textual, no inventar otro:
  ```php
  http_response_code(404);
  $pageTitle = '404 - No encontrado';
  include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
  include VIEW_PATH . '/Errores/404.php';
  include VIEW_PATH . '/Plantillas/pieSitio.php';
  return;
  ```
  `return` es obligatorio: sin él la ejecución sigue e imprime doble footer.

## Convenciones que no son las de PHP

- **Todo en español**: carpetas, clases, comentarios, copy de la UI, mensajes de commit.
- **Controladores en camelCase, y el nombre de la clase DEBE ser idéntico al archivo y a la
  cadena del router** — `index.php:67,77` resuelve `Controladores/<nombre>.php` y luego hace
  `class_exists($nombre)`. Por eso existe `inicioController` y no `InicioController`.
- **Modelos en PascalCase**, sin namespaces. El autoloader (`Configuracion/app.php:26`) traduce
  clase → `Modelos/<Clase>.php` → `Controladores/<Clase>.php`. Un nombre de clase duplicado
  entre las dos carpetas rompe el autoload silenciosamente.
- **Vistas**: carpeta PascalCase y en plural por dominio (`Vistas/Servicios/`), archivo camelCase
  (`index.php`, `ver.php`, `registrar.php`). Ojo: `Inicio` es singular, el resto plural.
- Commits: Conventional Commits en español (`feat:`, `refactor:`, `fix:`) directo a `main`.

## Modelos = datos falsos en memoria

Cada modelo es `private static $array` + métodos estáticos. No hay PDO ni mysqli en el repo.
- Cambiar datos = editar el array, nunca agregar SQL.
- Todo está en español EXCEPTO las claves de los arrays, que están en inglés
  (`name`, `slug`, `cover_image`, `price_label`). No "corregir" eso salvo que se cambie el modelo entero.
- `Servicio` y `Negocio` comparten `findBySlug`/`find`; `Pedido::findById` compara `===` con el
  id string (`TEX-2026-0847`), así que no acepta ints.

## Estilos

- Bootstrap 5 para layout/grid; `Publico/Recursos/css/custom.css` tiene **todos** los tokens de
  diseño como custom properties (`--primary`, `--teal-band`, `--whatsapp`, `--font-mono`, ...).
- Nunca escribir hex ni px sueltos en una vista: `style="color:var(--primary)"`. El `style=` inline
  es la convención establecida acá, no una deuda a limpiar.
- Iconos: Bootstrap Icons (`<i class="bi bi-*">`). El campo `icon` de los servicios ya trae el
  nombre sin prefijo.

## Forbidden Patterns

| WRONG | CORRECT | Por qué |
|---|---|---|
| `require`/`include` de una vista por nombre en el controlador sin crearla primero | crear el archivo bajo `Vistas/<Carpeta>/` | 17 de 20 vistas no existen: fatal en producción, no warning |
| agregar PDO / `mysqli` / SQL a los modelos | editar el array estático | el proyecto es 100% mock, sin credenciales ni esquema |
| `<script src="...app.js">` propio sin crear el archivo | crear `Publico/Recursos/js/` primero | `pieSitio.php` ya lo referencia y hoy 404ea |
| `session_start()` / auth asumida | arrancar de cero y decirlo | no existe capa de sesión en el repo |
| asumir que `composer`/`npm` existen | usar `php -l` + Apache | no hay manifests |

## Límites

- Nunca hardcodear otra ruta que no pase por la tabla `$routes` de `index.php`.
- Nunca dejar un controlador sin su parche 404.
- Nunca cambiar `BASE_URL` sin revisar `rg -n "BASE_URL"`.
- No agregar dependencias: ni CDN nuevo, ni npm, ni composer.

## Verificación

Antes de dar por terminado:

```powershell
# 1. Sintaxis de todos los archivos
Get-ChildItem -Recurse -Filter *.php | ForEach-Object { php -l $_.FullName }

# 2. Toda vista que un controlador incluye existe
$views = rg -o "VIEW_PATH \. '([^']+)'" -r '$1' --no-filename Controladores index.php | Sort-Object -Unique
$views | ForEach-Object { "{0,-32} {1}" -f $_, $(if (Test-Path "Vistas\$($_.TrimStart('/'))"){"OK"}else{"FALTA"}) }

# 3. Cada URL real matchea una ruta (si el prefijo sigue puesto, todo FALTA)
rg -n "'/" index.php
```

Revisar en navegador `http://localhost/4-ThimpsonExpressAppWeb/` (o `/rastrear/...` una vez
agregada la ruta) — Apache tiene que estar arriba; la CLI `php` no alcanza para probar routing.

## Git workflow — commit + push en un comando

**Alias global** (ya configurado):
```bash
git save "feat: mensaje convencional en español"
```
Hace `add -A` + `commit -m` + `push` en un paso. Usalo en lugar de `git commit` + `git push` separados.

**Auto-push tras cada commit** (hook local):
- Archivo: `.git/hooks/post-commit` (creado, 178 bytes)
- En Windows: funciona desde **Git Bash**; en PowerShell/CMD el shebang no se ejecuta.
- Para desactivar: `chmod -x .git/hooks/post-commit` (Git Bash) o renombrar el archivo.

> ⚠️ No uses auto-commit en cada guardado (historial ruidoso, código roto en remoto). Usa `git save` cuando la tarea esté lista.