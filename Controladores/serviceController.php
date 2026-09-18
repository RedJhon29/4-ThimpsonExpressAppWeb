<?php
/**
 * Controlador: Servicios
 */
class serviceController {

    public function index() {
        $pageTitle = 'Servicios';
        $activeMenu = 'servicios';
        $services = Service::all();

        include VIEW_PATH . '/Servicios/index.php';
    }

    public function show($slug) {
        $service = Service::findBySlug($slug);

        if (!$service) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/Plantillas/siteHeader.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/siteFooter.php';
            return;
        }

        $pageTitle = $service['name'];
        $activeMenu = 'servicios';
        $municipalities = Service::getMunicipalities();

        include VIEW_PATH . '/Servicios/ver.php';
    }
}
