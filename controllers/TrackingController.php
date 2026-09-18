<?php
/**
 * Controlador: Rastreo de Pedidos
 */
class TrackingController {

    public function index() {
        $pageTitle = 'Rastrear Pedido';
        $activeMenu = 'rastrear';
        $orders = Order::all();

        include VIEW_PATH . '/tracking/index.php';
    }

    public function show($orderId) {
        $order = Order::findById($orderId);

        if (!$order) {
            http_response_code(404);
            $pageTitle = '404 - Pedido no encontrado';
            include VIEW_PATH . '/layouts/site-header.php';
            include VIEW_PATH . '/errors/404.php';
            include VIEW_PATH . '/layouts/site-footer.php';
            return;
        }

        $pageTitle = 'Rastrear ' . $order['code'];
        $activeMenu = 'rastrear';
        $rider = $order['rider'] ? Rider::find($order['rider']['id']) : null;

        include VIEW_PATH . '/tracking/show.php';
    }
}
