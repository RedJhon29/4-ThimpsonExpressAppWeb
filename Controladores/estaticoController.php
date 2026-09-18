<?php
/**
 * Controlador: Páginas Estáticas
 */
class estaticoController {

    public function about() {
        $pageTitle = 'Nosotros';
        $activeMenu = 'nosotros';
        $testimonials = Calificacion::getTestimonials();

        include VIEW_PATH . '/Nosotros/index.php';
    }

    public function contact() {
        $pageTitle = 'Contacto';
        $activeMenu = 'contacto';

        include VIEW_PATH . '/Contacto/index.php';
    }

    public function gallery() {
        $pageTitle = 'Galería';
        $activeMenu = 'galeria';
        $galleryItems = Calificacion::getGallery();

        include VIEW_PATH . '/Galeria/index.php';
    }
}
