<?php
/**
 * Front Controller — Thimpson Express App Web
 * Archivo de entrada: php/public/index.php
 */

// Directorio base del proyecto (un nivel arriba de public/)
$baseDir = dirname(__DIR__);

// Cargar configuración
require_once $baseDir . '/config/app.php';

// URI actual
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/') ?: '/';

// Remover prefijo del proyecto si existe
$projectPrefix = '/4-ThimpsonExpressAppWeb/php/public';
if (strpos($uri, $projectPrefix) === 0) {
    $uri = substr($uri, strlen($projectPrefix)) ?: '/';
}

// Router: mapear rutas → Controlador@método
$routes = [
    '/'                     => ['HomeController', 'index'],
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
    $activeMenu = '';
    include VIEW_PATH . '/layouts/site-header.php';
    include VIEW_PATH . '/errors/404.php';
    include VIEW_PATH . '/layouts/site-footer.php';
    exit;
}

// Cargar controlador
$controllerFile = CONTROLLER_PATH . '/' . $controller . '.php';

if (!file_exists($controllerFile)) {
    http_response_code(500);
    echo "Error: Controlador '$controller' no encontrado.";
    exit;
}

require_once $controllerFile;

if (!class_exists($controller)) {
    http_response_code(500);
    echo "Error: Clase '$controller' no definida.";
    exit;
}

$controllerInstance = new $controller();

if (!method_exists($controllerInstance, $action)) {
    http_response_code(500);
    echo "Error: Método '$action' no existe en '$controller'.";
    exit;
}

// Ejecutar acción con parámetros
call_user_func_array([$controllerInstance, $action], $params);
