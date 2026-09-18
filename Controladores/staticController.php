<?php
/**
 * Controlador: Páginas Estáticas
 */
class staticController {

    public function about() {
        $pageTitle = 'Nosotros';
        $activeMenu = 'nosotros';
        $testimonials = Rating::getTestimonials();

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
        $galleryItems = Rating::getGallery();

        include VIEW_PATH . '/Galeria/index.php';
    }
}
