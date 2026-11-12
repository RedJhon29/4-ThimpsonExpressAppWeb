<?php
/*====================ENCABEZADO====================
CONFIGURACIÓN GENERAL: rutas, constantes del negocio y autoload
ARCHIVO: Configuracion/app.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: define las rutas del proyecto, los datos de la empresa y el
          autoloader que traduce clase → Modelos/ o Controladores/.
VINCULADO A: lo requiere index.php; lo usan todas las vistas y controladores.
SI SE ALTERA: revisar BASE_URL (afecta todos los enlaces) y el autoloader.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

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

/**
 * ====================ENCABEZADO====================
 * FUNCIÓN: e() | ROL: helper de vistas
 * =====================DETALLES=====================
 * QUÉ HACE: escapa texto para imprimirlo seguro dentro de HTML.
 * VINCULADO A: la usan las vistas; delega en htmlspecialchars().
 * SI SE ALTERA: si cambia la codificación, revisar quién la llama.
 * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
 * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
 * ==================================================
 */
function e($valor) {
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}
