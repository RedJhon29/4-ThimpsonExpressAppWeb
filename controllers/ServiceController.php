<?php
/**
 * Controlador: Servicios
 */
class ServiceController {

    public function index() {
        $pageTitle = 'Servicios';
        $activeMenu = 'servicios';
        $services = Service::all();

        include VIEW_PATH . '/services/index.php';
    }

    public function show($slug) {
        $service = Service::findBySlug($slug);

        if (!$service) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/layouts/site-header.php';
            include VIEW_PATH . '/errors/404.php';
            include VIEW_PATH . '/layouts/site-footer.php';
            return;
        }

        $pageTitle = $service['name'];
        $activeMenu = 'servicios';
        $municipalities = Service::getMunicipalities();

        include VIEW_PATH . '/services/show.php';
    }
}
