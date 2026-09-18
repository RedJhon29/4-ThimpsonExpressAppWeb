<?php
/**
 * Controlador: Suscripciones y Planes
 */
class suscripcionController {

    public function plans() {
        $pageTitle = 'Planes';
        $activeMenu = 'planes';
        $plans = Plan::all();

        include VIEW_PATH . '/Suscripciones/planes.php';
    }

    public function checkout($planId) {
        $plan = Plan::find($planId);

        if (!$plan) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/pieSitio.php';
            return;
        }

        $pageTitle = 'Checkout - ' . $plan['name'];
        $activeMenu = 'planes';

        include VIEW_PATH . '/Suscripciones/checkout.php';
    }

    public function billing() {
        $pageTitle = 'Facturación';
        $activeMenu = 'cuenta';
        $subscription = Suscripcion::getCurrent();
        $invoices = Facturacion::getInvoices();
        $paymentMethods = Facturacion::getPaymentMethods();

        include VIEW_PATH . '/Suscripciones/facturacion.php';
    }
}
