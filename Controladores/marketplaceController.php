<?php
/**
 * Controlador: Marketplace
 */
class marketplaceController {

    public function index() {
        $pageTitle = 'Marketplace';
        $activeMenu = 'marketplace';
        $businesses = Business::all();
        $categories = Business::getCategories();

        include VIEW_PATH . '/Marketplace/index.php';
    }

    public function show($slug) {
        $business = Business::findBySlug($slug);

        if (!$business) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/Plantillas/siteHeader.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/siteFooter.php';
            return;
        }

        $pageTitle = $business['name'];
        $activeMenu = 'marketplace';

        include VIEW_PATH . '/Marketplace/ver.php';
    }

    public function register() {
        $pageTitle = 'Registrar Negocio';
        $activeMenu = 'marketplace';
        $categories = Business::getCategories();
        $plans = Plan::all();

        include VIEW_PATH . '/Marketplace/registrar.php';
    }
}
