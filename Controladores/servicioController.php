<?php
/**
 * Controlador: Servicios
 */
class servicioController {

    public function index() {
        $pageTitle = 'Servicios';
        $activeMenu = 'servicios';
        $services = Servicio::all();

        include VIEW_PATH . '/Servicios/index.php';
    }

    public function show($slug) {
        $service = Servicio::findBySlug($slug);

        if (!$service) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/pieSitio.php';
            return;
        }

        $pageTitle = $service['name'];
        $activeMenu = 'servicios';
        $municipalities = Servicio::getMunicipalities();

        include VIEW_PATH . '/Servicios/ver.php';
    }
}
