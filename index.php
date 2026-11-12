<?php
/*====================ENCABEZADO====================
FRONT CONTROLLER: enrutador único del sitio público
ARCHIVO: index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: descuenta el subdirectorio de la URL y la resuelve contra $routes
          para ejecutar controlador@método; sin coincidencia responde 404.
VINCULADO A: lo reescribe .htaccess; carga Configuracion/app.php, los
          Controladores/* y Vistas/Errores/404.php; depende de BASE_URL.
SI SE ALTERA: revisar la tabla de rutas, las plantillas y las rutas con {parámetro}.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

require_once __DIR__ . '/Configuracion/app.php';

// URI pedida por el navegador
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$uri = is_string($uri) && $uri !== '' ? $uri : '/';

// La app vive en un subdirectorio de htdocs: hay que quitarlo antes de comparar
$prefijoAplicacion = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');
if ($prefijoAplicacion !== '' && $prefijoAplicacion !== '/' && stripos($uri, $prefijoAplicacion) === 0) {
    $restoSinPrefijo = substr($uri, strlen($prefijoAplicacion));
    if ($restoSinPrefijo === '' || $restoSinPrefijo[0] === '/') {
        $uri = $restoSinPrefijo;
    }
}

$uri = rtrim($uri, '/') ?: '/';

// Router: mapear rutas → Controlador@método
$routes = [
    '/'                          => ['inicioController', 'index'],
    '/servicios'                 => ['servicioController', 'index'],
    '/servicios/{slug}'          => ['servicioController', 'show'],
    '/marketplace'               => ['tiendaController', 'index'],
    '/marketplace/registro'      => ['tiendaController', 'register'],
    '/marketplace/{slug}'        => ['tiendaController', 'show'],
    '/planes'                    => ['suscripcionController', 'plans'],
    '/planes/{planId}/checkout'  => ['suscripcionController', 'checkout'],
    '/rastrear'                  => ['rastreoController', 'index'],
    '/rastrear/{orderId}'        => ['rastreoController', 'show'],
    '/login'                     => ['autenticacionController', 'login'],
    '/recuperar'                 => ['autenticacionController', 'recover'],
    '/suscribir'                 => ['autenticacionController', 'subscribe'],
    '/cuenta/facturacion'        => ['suscripcionController', 'billing'],
    '/nosotros'                  => ['estaticoController', 'about'],
    '/contacto'                  => ['estaticoController', 'contact'],
    '/galeria'                   => ['estaticoController', 'gallery'],
];

// Buscar coincidencia exacta
$controller = null;
$action = null;
$params = [];

if (isset($routes[$uri])) {
    $controller = $routes[$uri][0];
    $action = $routes[$uri][1];
} else {
    // Buscar rutas con parámetros
    foreach ($routes as $route => $handler) {
        $pattern = preg_replace('/\{(\w+)\}/', '(?P<$1>[^/]+)', $route);
        $pattern = '#^' . $pattern . '$#';

        if (preg_match($pattern, $uri, $matches)) {
            $controller = $handler[0];
            $action = $handler[1];
            foreach ($matches as $key => $value) {
                if (is_string($key)) {
                    $params[$key] = $value;
                }
            }
            break;
        }
    }
}

// Si no se encontró ruta, mostrar 404
if ($controller === null) {
    http_response_code(404);
    $pageTitle = '404 - No encontrado';
    include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
    include VIEW_PATH . '/Errores/404.php';
    include VIEW_PATH . '/Plantillas/pieSitio.php';
    exit;
}

// Cargar controlador y ejecutar acción
$controllerFile = CONTROLLER_PATH . '/' . $controller . '.php';

if (!file_exists($controllerFile)) {
    http_response_code(500);
    echo "Error: Controlador '$controller' no encontrado.";
    exit;
}

require_once $controllerFile;

if (!class_exists($controller)) {
    http_response_code(500);
    echo "Error: Clase '$controller' no definida en '$controllerFile'.";
    exit;
}

$controllerInstance = new $controller();

if (!method_exists($controllerInstance, $action)) {
    http_response_code(500);
    echo "Error: Método '$action' no existe en '$controller'.";
    exit;
}

call_user_func_array([$controllerInstance, $action], $params);
