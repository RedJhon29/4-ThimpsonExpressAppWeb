<?php
/**
 * Controlador: Marketplace
 */
class tiendaController {

    public function index() {
        $pageTitle = 'Marketplace';
        $activeMenu = 'marketplace';
        $businesses = Negocio::all();
        $categories = Negocio::getCategories();

        include VIEW_PATH . '/Marketplace/index.php';
    }

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

    public function register() {
        $pageTitle = 'Registrar Negocio';
        $activeMenu = 'marketplace';
        $categories = Negocio::getCategories();
        $plans = Plan::all();

        include VIEW_PATH . '/Marketplace/registrar.php';
    }
}
