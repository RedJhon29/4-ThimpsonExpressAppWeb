<?php
/**
 * Controlador: Autenticación
 */
class AuthController {

    public function login() {
        $pageTitle = 'Iniciar Sesión';
        $activeMenu = 'login';

        include VIEW_PATH . '/auth/login.php';
    }

    public function recover() {
        $pageTitle = 'Recuperar Contraseña';
        $activeMenu = 'recuperar';

        include VIEW_PATH . '/auth/recover.php';
    }

    public function subscribe() {
        $pageTitle = 'Suscribirse';
        $activeMenu = 'suscribir';

        include VIEW_PATH . '/auth/subscribe.php';
    }
}
