# AGENTS.md — Thimpson Express (App Web)

Sitio público de Thimpson Express (delivery/mandados en Ocotal, Nicaragua).
MVC en PHP **sin dependencias**: sin `composer.json`, sin npm, sin build, sin base de
datos, sin tests. Todo el CSS/JS entra por CDN de Bootstrap 5.

## Comandos

| Qué | Cómo |
|---|---|
| Lint (única verificación automatizada) | `Get-ChildItem -Recurse -Filter *.php \| ForEach-Object { php -l $_.FullName }` |
| Servir | Apache de XAMPP: `http://127.0.0.1:8080/4-ThimpsonExpressAppWeb` (requiere `mod_rewrite` + `AllowOverride All` en `C:\xampp\apache\conf\httpd.conf`); no hay `server.php` ni artisan. **En esta máquina Apache escucha en `127.0.0.1:8080`**, no en el 80: `http://localhost/...` no responde |

No existen `composer test`, `npm test`, PHPUnit ni workflows de CI. No los inventes.

## Estado actual — leer antes de prometer nada

La migración a MVC está completa para el **sitio público estático** (Fase 1 cerrada):
las 20 vistas que los controladores incluyen existen, el router resuelve rutas con
`{parámetro}` y `Publico/Recursos/js/app.js` está creado.

- **Vistas**: 20/20 existen. Chequeo reproducible:
  `rg -o "VIEW_PATH \. '([^']+)'" -r '$1' --no-filename Controladores index.php`
- **Rutas con parámetro activas**: `/servicios/{slug}`, `/marketplace/{slug}`,
  `/rastrear/{orderId}`, `/planes/{planId}/checkout`, más `/marketplace/registro` y
  `/cuenta/facturacion`. Los nombres de parámetro coinciden con la firma del método
  (`show($slug)`, `show($orderId)`, `checkout($planId)`) porque el router usa
  `call_user_func_array` con argumentos nombrados (PHP 8).
- **JS del sitio**: `Publico/Recursos/js/app.js` (volver arriba, chat, aviso de
  formularios `.form-demo`) y `Publico/Recursos/js/mapa.js` (Leaflet en rastreo y
  contacto). `app.js` se carga desde `pieSitio.php` y deriva la raíz con
  `document.currentScript.src`; `mapa.js` se carga por página con `$extraJs`.
- **Sigue sin existir**: `session_start()`, manejo de POST, CSRF y capa de auth.
  `autenticacionController` solo renderiza formularios marcados `.form-demo`, y
  `app.js` intercepta el submit para avisar que la función no está habilitada.
  Cualquier trabajo de auth arranca de cero. Tampoco hay pagos: checkout y
  facturación son informativos y derivan a WhatsApp.

## Trampa #1 — el router debe descontar el subdirectorio (ya resuelto, no romperlo)

`index.php` compara el path de `$_SERVER['REQUEST_URI']` contra una tabla de rutas
**sin prefijo** (`/servicios`). Como la app vive en `htdocs/4-ThimpsonExpressAppWeb`, la
URI real es `/4-ThimpsonExpressAppWeb/servicios`. Si se compara completo, **nunca
coincide y todas las rutas dan 404**, incluso `/`.

El fix vigente (no reemplazarlo por un `str_replace(BASE_URL, ...)` fijo) deriva el
prefijo del propio script:

```php
$prefijoAplicacion = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');
if ($prefijoAplicacion !== '' && $prefijoAplicacion !== '/' && stripos($uri, $prefijoAplicacion) === 0) {
    $restoSinPrefijo = substr($uri, strlen($prefijoAplicacion));
    if ($restoSinPrefijo === '' || $restoSinPrefijo[0] === '/') {
        $uri = $restoSinPrefijo;
    }
}
```

Ventaja: sigue funcionando si el docroot pasa a ser la carpeta del proyecto
(`dirname` devuelve `/` y el bloque no se ejecuta). `BASE_URL` (`Configuracion/app.php`)
sigue hardcodeado a `/4-ThimpsonExpressAppWeb` y es lo que usan las vistas para enlazar;
si algún día cambia la carpeta, hay que actualizar **las dos cosas**.

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
  Van rutas **completas** (`BASE_URL . '/Publico/Recursos/js/mapa.js'`), no relativas.
- Todo dato de modelo que se imprime en HTML pasa por `e()` (`htmlspecialchars`, definido en
  `Configuracion/app.php:58`). No imprimir `$order['name']` crudo aunque el dato sea mock.
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
  cadena del router** — `index.php:93,103` resuelve `Controladores/<nombre>.php` y luego hace
  `class_exists($nombre)`. Por eso existe `inicioController` y no `InicioController`.
- **Modelos en PascalCase**, sin namespaces. El autoloader (`Configuracion/app.php:36`) traduce
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
- Favicon: `Publico/Recursos/img/favicon.svg` (T negra sobre ámbar `#FBB03B`) + `favicon.ico`
  generado por `scripts/generar-favicon.php` (GD, 16/32/48, se autoverifica); declarados en
  `Vistas/Plantillas/encabezadoSitio.php:8-9`. Si cambia la geometría de la T hay que repetirla
  en los dos. **Un `--` dentro de un comentario XML invalida el SVG** y el navegador no lo dibuja.

## Forbidden Patterns

| WRONG | CORRECT | Por qué |
|---|---|---|
| `require`/`include` de una vista por nombre en el controlador sin crearla primero | crear el archivo bajo `Vistas/<Carpeta>/` | con `display_errors=Off` un `include` faltante da página en blanco con HTTP 200, no un warning visible |
| agregar PDO / `mysqli` / SQL a los modelos | editar el array estático | el proyecto es 100% mock, sin credenciales ni esquema |
| crear un `.js`/`.css` nuevo sin registrarlo | `app.js`/`mapa.js` ya existen; JS de página va por `$extraJs` | si no se registra, nunca se carga y el 404 queda silencioso en consola |
| `session_start()` / auth asumida | arrancar de cero y decirlo | no existe capa de sesión en el repo |
| asumir que `composer`/`npm` existen | usar `php -l` + Apache | no hay manifests |
| agregar una ruta con `{param}` cuyo nombre no coincida con el parámetro del método | mismo nombre (`{orderId}` → `show($orderId)`) | `call_user_func_array` usa argumentos nombrados: si no coinciden, `ArgumentCountError` |

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

# 3. Barrido HTTP real (Apache arriba en 127.0.0.1:8080)
$base = 'http://127.0.0.1:8080/4-ThimpsonExpressAppWeb'
foreach ($r in '/','/servicios','/marketplace','/planes','/rastrear','/nosotros','/contacto',
                '/galeria','/login','/recuperar','/suscribir','/cuenta/facturacion') {
    "{0,-24} {1}" -f $r, (& curl.exe -s -o NUL -w '%{http_code}' "$base$r")
}
# Esperado: 200 en todas; 302 en /rastrear?codigo=<id válido>; 404 en /rastrear/<id inexistente>
```

Además, en navegador (`http://127.0.0.1:8080/4-ThimpsonExpressAppWeb/`), con la consola
abierta en nivel *error*:

- Sin errores de consola en ninguna página (el único 404 legítimo es el documento cuando
  se pide una ruta inexistente).
- `#backToTop` aparece después de 300px de scroll y vuelve arriba (el CSS usa
  `scroll-behavior: smooth`, así que el `scrollY` no cambia en el mismo tick).
- `#chatToggle` abre el widget y el bot `responde` según la palabra clave.
- Un `form.form-demo` con los campos `required` completos muestra SweetAlert y **no**
  navega; con campos vacíos no pasa nada porque la validación HTML5 lo bloquea antes.
- Los mapas de `/rastrear/<id>` y `/contacto` inicializan Leaflet (`.leaflet-container`).

La CLI `php` no alcanza para probar routing: hace falta Apache.

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