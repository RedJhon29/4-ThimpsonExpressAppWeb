<?php
/**
 * Controlador: Páginas Estáticas
 */
class StaticController {

    public function about() {
        $pageTitle = 'Nosotros';
        $activeMenu = 'nosotros';
        $testimonials = Rating::getTestimonials();

        include VIEW_PATH . '/about/index.php';
    }

    public function contact() {
        $pageTitle = 'Contacto';
        $activeMenu = 'contacto';

        include VIEW_PATH . '/contact/index.php';
    }

    public function gallery() {
        $pageTitle = 'Galería';
        $activeMenu = 'galeria';
        $galleryItems = Rating::getGallery();

        include VIEW_PATH . '/gallery/index.php';
    }
}
