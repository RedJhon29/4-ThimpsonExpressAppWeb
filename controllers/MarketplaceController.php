<?php
/**
 * Controlador: Marketplace
 */
class MarketplaceController {

    public function index() {
        $pageTitle = 'Marketplace';
        $activeMenu = 'marketplace';
        $businesses = Business::all();
        $categories = Business::getCategories();

        include VIEW_PATH . '/marketplace/index.php';
    }

    public function show($slug) {
        $business = Business::findBySlug($slug);

        if (!$business) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/layouts/site-header.php';
            include VIEW_PATH . '/errors/404.php';
            include VIEW_PATH . '/layouts/site-footer.php';
            return;
        }

        $pageTitle = $business['name'];
        $activeMenu = 'marketplace';

        include VIEW_PATH . '/marketplace/show.php';
    }

    public function register() {
        $pageTitle = 'Registrar Negocio';
        $activeMenu = 'marketplace';
        $categories = Business::getCategories();
        $plans = Plan::all();

        include VIEW_PATH . '/marketplace/register.php';
    }
}
