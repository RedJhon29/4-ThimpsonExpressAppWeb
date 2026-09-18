<?php
/**
 * Controlador: HomePage
 */
class inicioController {

    public function index() {
        $pageTitle = 'Inicio';
        $activeMenu = 'home';

        // Datos para la vista
        $services = Servicio::all();
        $businesses = Negocio::all();
        $testimonials = Calificacion::getTestimonials();

        include VIEW_PATH . '/Inicio/index.php';
    }
}
