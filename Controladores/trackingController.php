<?php
/**
 * Controlador: Rastreo de Pedidos
 */
class trackingController {

    public function index() {
        $pageTitle = 'Rastrear Pedido';
        $activeMenu = 'rastrear';
        $orders = Order::all();

        include VIEW_PATH . '/Rastreo/index.php';
    }

    public function show($orderId) {
        $order = Order::findById($orderId);

        if (!$order) {
            http_response_code(404);
            $pageTitle = '404 - Pedido no encontrado';
            include VIEW_PATH . '/Plantillas/siteHeader.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/siteFooter.php';
            return;
        }

        $pageTitle = 'Rastrear ' . $order['code'];
        $activeMenu = 'rastrear';
        $rider = $order['rider'] ? Rider::find($order['rider']['id']) : null;

        include VIEW_PATH . '/Rastreo/ver.php';
    }
}
