<?php
/**
 * Controlador: Autenticación
 */
class autenticacionController {

    public function login() {
        $pageTitle = 'Iniciar Sesión';
        $activeMenu = 'login';

        include VIEW_PATH . '/Autenticacion/login.php';
    }

    public function recover() {
        $pageTitle = 'Recuperar Contraseña';
        $activeMenu = 'recuperar';

        include VIEW_PATH . '/Autenticacion/recuperar.php';
    }

    public function subscribe() {
        $pageTitle = 'Suscribirse';
        $activeMenu = 'suscribir';

        include VIEW_PATH . '/Autenticacion/suscribir.php';
    }
}
