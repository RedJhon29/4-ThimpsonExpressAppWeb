<?php
/**
 * Front Controller — Thimpson Express App Web
 * Todas las peticiones pasan por aquí vía .htaccess
 */

require_once __DIR__ . '/Configuracion/app.php';

// URI actual
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/') ?: '/';

// Router: mapear rutas → Controlador@método
$routes = [
    '/'                     => ['inicioController', 'index'],
    '/servicios'            => ['servicioController', 'index'],
    '/marketplace'          => ['tiendaController', 'index'],
    '/marketplace/registro' => ['tiendaController', 'register'],
    '/planes'               => ['suscripcionController', 'plans'],
    '/rastrear'             => ['rastreoController', 'index'],
    '/login'                => ['autenticacionController', 'login'],
    '/recuperar'            => ['autenticacionController', 'recover'],
    '/suscribir'            => ['autenticacionController', 'subscribe'],
    '/nosotros'             => ['estaticoController', 'about'],
    '/contacto'             => ['estaticoController', 'contact'],
    '/galeria'              => ['estaticoController', 'gallery'],
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
