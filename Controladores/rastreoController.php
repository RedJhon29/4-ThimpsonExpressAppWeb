<?php
/*====================ENCABEZADO====================
CONTROLADOR: Rastreo de pedidos
ARCHIVO: Controladores/rastreoController.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: busca un pedido por código, redirige a su detalle y muestra el
          seguimiento con mapa y pasos.
VINCULADO A: lo enruta index.php; usa Modelos/Pedido.php y
          Modelos/Motorizado.php; incluye Vistas/Rastreo/*.php.
SI SE ALTERA: revisar las rutas /rastrear y /rastrear/{orderId} de index.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/
class rastreoController {

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: index() | ROL: controlador
     * =====================DETALLES=====================
     * QUÉ HACE: valida ?codigo=, redirige al detalle si existe o avisa si no.
     * VINCULADO A: ruta /rastrear; Modelos/Pedido.php::findById().
     * SI SE ALTERA: cambian la búsqueda y el listado de Rastreo/index.php.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    public function index() {
        $pageTitle = 'Rastrear Pedido';
        $activeMenu = 'rastrear';

        $codigo = isset($_GET['codigo']) && is_string($_GET['codigo'])
            ? trim($_GET['codigo'])
            : '';

        $errorBusqueda = null;

        if ($codigo !== '') {
            $pedidoEncontrado = Pedido::findById($codigo);

            if ($pedidoEncontrado) {
                header('Location: ' . BASE_URL . '/rastrear/' . rawurlencode($pedidoEncontrado['id']));
                exit;
            }

            $errorBusqueda = 'No encontramos un pedido con el código «' . $codigo . '».';
        }

        $orders = Pedido::all();

        include VIEW_PATH . '/Rastreo/index.php';
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: show() | ROL: controlador
     * =====================DETALLES=====================
     * QUÉ HACE: muestra el seguimiento de un pedido o responde 404.
     * VINCULADO A: ruta /rastrear/{orderId}; Pedido y Motorizado.
     * SI SE ALTERA: cambian los pasos, el mapa y el rider de Rastreo/ver.php.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
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

        $pageTitle = 'Rastrear ' . $order['id'];
        $activeMenu = 'rastrear';
        $rider = $order['rider'] ? Motorizado::find($order['rider']['id']) : null;

        include VIEW_PATH . '/Rastreo/ver.php';
    }
}
