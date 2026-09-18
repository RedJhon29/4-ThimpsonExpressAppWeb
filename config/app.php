<?php
/**
 * Configuración general de la aplicación
 * Thimpson Express App Web
 */

// Ruta base (un nivel arriba de public/)
define('BASE_PATH', dirname(__DIR__));
define('PUBLIC_PATH', BASE_PATH . '/public');
define('VIEW_PATH', BASE_PATH . '/views');
define('CONTROLLER_PATH', BASE_PATH . '/controllers');
define('MODEL_PATH', BASE_PATH . '/models');

// URL base (cambiar según servidor)
define('BASE_URL', '/4-ThimpsonExpressAppWeb/php/public');

// Datos de la empresa
define('APP_NAME', 'Thimpson Express');
define('APP_TAGLINE', 'Servicio Express Thimpson');
define('APP_FOUNDER', 'Allan Thimpson');
define('APP_LOCATION', 'Ocotal, Nueva Segovia, Nicaragua');
define('APP_PHONE_CLARO', '+505 8415 9112');
define('APP_PHONE_TIGO', '+505 8593 2295');
define('APP_WHATSAPP', '+505 8415 9112');

// Colores de marca
define('COLOR_PRIMARY', '#FBB03B');
define('COLOR_DARK_BAND', '#000000');
define('COLOR_TEAL_BAND', '#0B1F22');
define('COLOR_SURFACE', '#FFFFFF');
define('COLOR_WHATSAPP', '#25D366');
define('COLOR_TIGO', '#00377B');
define('COLOR_DESTRUCTIVE', '#E53935');

// Moneda
define('CURRENCY_SYMBOL', 'C$');
define('CURRENCY_NAME', 'Córdobas');

// Idioma
define('APP_LOCALE', 'es-NI');

// Cargar autoloader de modelos y controladores
spl_autoload_register(function ($class) {
    $modelFile = MODEL_PATH . '/' . $class . '.php';
    $controllerFile = CONTROLLER_PATH . '/' . $class . '.php';

    if (file_exists($modelFile)) {
        require_once $modelFile;
    } elseif (file_exists($controllerFile)) {
        require_once $controllerFile;
    }
});
