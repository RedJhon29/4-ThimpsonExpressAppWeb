<?php
/**
 * Controlador: HomePage
 */
class homeController {

    public function index() {
        $pageTitle = 'Inicio';
        $activeMenu = 'home';

        // Datos para la vista
        $services = Service::all();
        $businesses = Business::all();
        $testimonials = Rating::getTestimonials();

        include VIEW_PATH . '/Inicio/index.php';
    }
}
