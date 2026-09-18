<?php
/**
 * Configuración general — Thimpson Express App Web
 */

// Ruta base
define('BASE_PATH', dirname(__DIR__));
define('VIEW_PATH', BASE_PATH . '/Vistas');
define('CONTROLLER_PATH', BASE_PATH . '/Controladores');
define('MODEL_PATH', BASE_PATH . '/Modelos');

// URL base
define('BASE_URL', '/4-ThimpsonExpressAppWeb');

// Datos de la empresa
define('APP_NAME', 'Thimpson Express');
define('APP_PHONE_CLARO', '+505 8415 9112');
define('APP_PHONE_TIGO', '+505 8593 2295');
define('APP_WHATSAPP', '+505 8415 9112');
define('APP_LOCATION', 'Ocotal, Nueva Segovia, Nicaragua');

// Moneda
define('CURRENCY_SYMBOL', 'C$');

// Autoloader
spl_autoload_register(function ($class) {
    $modelFile = MODEL_PATH . '/' . $class . '.php';
    $controllerFile = CONTROLLER_PATH . '/' . $class . '.php';

    if (file_exists($modelFile)) {
        require_once $modelFile;
    } elseif (file_exists($controllerFile)) {
        require_once $controllerFile;
    }
});
