<?php
/**
 * Controlador: Rastreo de Pedidos
 */
class rastreoController {

    public function index() {
        $pageTitle = 'Rastrear Pedido';
        $activeMenu = 'rastrear';
        $orders = Pedido::all();

        include VIEW_PATH . '/Rastreo/index.php';
    }

    public function show($orderId) {
        $order = Pedido::findById($orderId);

        if (!$order) {
            http_response_code(404);
            $pageTitle = '404 - Pedido no encontrado';
            include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
            include VIEW_PATH . '/Errores/404.php';
            include VIEW_PATH . '/Plantillas/pieSitio.php';
            return;
        }

        $pageTitle = 'Rastrear ' . $order['code'];
        $activeMenu = 'rastrear';
        $rider = $order['rider'] ? Motorizado::find($order['rider']['id']) : null;

        include VIEW_PATH . '/Rastreo/ver.php';
    }
}
