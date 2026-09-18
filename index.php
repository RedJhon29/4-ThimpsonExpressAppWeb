<?php
/**
 * Front Controller — Thimpson Express App Web
 * Todas las peticiones pasan por aquí vía .htaccess
 */

require_once __DIR__ . '/config/app.php';

// URI actual
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/') ?: '/';

// Router: mapear rutas → Controlador@método
$routes = [
    '/'                     => ['HomeController', 'index'],
    '/servicios'            => ['ServiceController', 'index'],
    '/servicios'            => ['ServiceController', 'index'],
    '/marketplace'          => ['MarketplaceController', 'index'],
    '/marketplace/registro' => ['MarketplaceController', 'register'],
    '/planes'               => ['SubscriptionController', 'plans'],
    '/rastrear'             => ['TrackingController', 'index'],
    '/login'                => ['AuthController', 'login'],
    '/recuperar'            => ['AuthController', 'recover'],
    '/suscribir'            => ['AuthController', 'subscribe'],
    '/nosotros'             => ['StaticController', 'about'],
    '/contacto'             => ['StaticController', 'contact'],
    '/galeria'              => ['StaticController', 'gallery'],
];

// Buscar coincidencia exacta
$controller = null;
$action = null;
$params = [];

if (isset($routes[$uri])) {
    $controller = $routes[$uri][0];
    $action = $routes[$uri][1];
} else {
    // Buscar rutas con parámetros (ej: /servicios/:slug)
    foreach ($routes as $route => $handler) {
        $pattern = preg_replace('/\{(\w+)\}/', '(?P<$1>[^/]+)', $route);
        $pattern = '#^' . $pattern . '$#';

        if (preg_match($pattern, $uri, $matches)) {
            $controller = $handler[0];
            $action = $handler[1];
            // Extraer parámetros nombrados
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
    include VIEW_PATH . '/layouts/site-header.php';
    include VIEW_PATH . '/errors/404.php';
    include VIEW_PATH . '/layouts/site-footer.php';
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

// Llamar al controlador con los parámetros
call_user_func_array([$controllerInstance, $action], $params);
