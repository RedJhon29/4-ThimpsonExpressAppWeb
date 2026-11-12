<?php
/*====================ENCABEZADO====================
CONTROLADOR: Marketplace
ARCHIVO: Controladores/tiendaController.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: lista y filtra los negocios afiliados, muestra el detalle de uno
          y el formulario informativo de registro.
VINCULADO A: lo enruta index.php; usa Modelos/Negocio.php y Modelos/Plan.php;
          incluye Vistas/Marketplace/*.php.
SI SE ALTERA: revisar los enlaces de Vistas/Marketplace/index.php y ver.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/
class tiendaController {

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: index() | ROL: controlador
     * =====================DETALLES=====================
     * QUÉ HACE: lista los negocios y aplica el filtro ?categoria= del menú.
     * VINCULADO A: ruta /marketplace; Modelos/Negocio.php::findByCategory().
     * SI SE ALTERA: cambian las tarjetas de Vistas/Marketplace/index.php.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    public function index() {
        $pageTitle = 'Marketplace';
        $activeMenu = 'marketplace';

        $categoriaActiva = isset($_GET['categoria']) && is_string($_GET['categoria'])
            ? $_GET['categoria']
            : 'todos';

        $categorias = Negocio::getCategories();
        $slugsValidos = array_column($categorias, 'slug');
        if (!in_array($categoriaActiva, $slugsValidos, true)) {
            $categoriaActiva = 'todos';
        }

        $businesses = Negocio::findByCategory($categoriaActiva);
        $categories = $categorias;

        include VIEW_PATH . '/Marketplace/index.php';
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: show() | ROL: controlador
     * =====================DETALLES=====================
     * QUÉ HACE: muestra un negocio por slug o responde 404 si no existe.
     * VINCULADO A: ruta /marketplace/{slug}; Modelos/Negocio.php::findBySlug().
     * SI SE ALTERA: cambian el detalle y los productos de ver.php.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    public function show($slug) {
        $business = Negocio::findBySlug($slug);

        if (!$business) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/pieSitio.php';
            return;
        }

        $pageTitle = $business['name'];
        $activeMenu = 'marketplace';

        include VIEW_PATH . '/Marketplace/ver.php';
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: register() | ROL: controlador
     * =====================DETALLES=====================
     * QUÉ HACE: presenta los requisitos y planes para afiliar un negocio.
     * VINCULADO A: ruta /marketplace/registro; Modelos/Plan.php::all().
     * SI SE ALTERA: cambian los requisitos de Vistas/Marketplace/registrar.php.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    public function register() {
        $pageTitle = 'Registrar Negocio';
        $activeMenu = 'marketplace';
        $categories = Negocio::getCategories();
        $plans = Plan::all();

        include VIEW_PATH . '/Marketplace/registrar.php';
    }
}
