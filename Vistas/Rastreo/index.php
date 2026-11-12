<?php
/*====================ENCABEZADO====================
VISTA: rastreo de pedidos — buscador y listado
ARCHIVO: Vistas/Rastreo/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: busca un pedido por código y lista los pedidos de ejemplo con su
          estado y enlace al seguimiento.
VINCULADO A: Controladores/rastreoController.php::index() define $orders y
    $errorBusqueda antes del include; el detalle vive en Rastreo/ver.php.
SI SE ALTERA: si cambia el modelo Pedido, ajustar ver.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Rastreo</p>
        <h1 class="h2 mb-2" style="color:#fff;">¿Dónde está tu pedido?</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Ingresá el código que te enviamos por WhatsApp para ver el recorrido en tiempo real.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row justify-content-center mb-5">
            <div class="col-lg-8">
                <div class="card card-custom p-4">
                    <form method="get" action="<?php echo BASE_URL; ?>/rastrear">
                        <label for="codigo" class="form-label" style="font-weight:600;">Código de pedido</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="codigo" name="codigo"
                                   placeholder="TEX-2026-0847" autocomplete="off" required>
                            <button type="submit" class="btn btn-primary-custom">
                                <i class="bi bi-search me-1"></i>Rastrear
                            </button>
                        </div>
                    </form>

                    <?php if (!empty($errorBusqueda)): ?>
                        <div class="alert mt-3 mb-0" style="background:var(--background);border:1px solid var(--destructive);color:var(--destructive);font-size:14px;">
                            <i class="bi bi-exclamation-triangle me-2"></i><?php echo e($errorBusqueda); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <h2 class="h5 mb-3">Pedidos recientes</h2>
        <p class="text-muted" style="font-size:13px;">Estos códigos son de ejemplo para probar el rastreo.</p>

        <div class="row g-4">
            <?php foreach ($orders as $order): ?>
                <?php
                $colorDelEstado = 'secondary';
                if ($order['status'] === 'IN_TRANSIT') {
                    $colorDelEstado = 'warning';
                } elseif ($order['status'] === 'PICKED_UP') {
                    $colorDelEstado = 'info';
                } elseif ($order['status'] === 'DELIVERED') {
                    $colorDelEstado = 'success';
                }
                ?>
                <div class="col-md-6 col-lg-4">
                    <div class="card card-custom h-100 p-4">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <span style="font-family:var(--font-mono);font-weight:600;"><?php echo e($order['id']); ?></span>
                            <span class="badge text-bg-<?php echo $colorDelEstado; ?>"><?php echo e($order['status_label']); ?></span>
                        </div>

                        <p class="mb-2" style="font-size:13px;color:var(--muted-foreground);">
                            <i class="bi bi-geo-alt me-1"></i><?php echo e($order['origin']['name']); ?>
                        </p>
                        <p class="mb-3" style="font-size:13px;color:var(--muted-foreground);">
                            <i class="bi bi-geo-alt-fill me-1" style="color:var(--primary);"></i><?php echo e($order['destination']['name']); ?>
                        </p>

                        <div class="d-flex justify-content-between mb-3" style="font-size:13px;">
                            <span><?php echo e($order['distance']); ?> km</span>
                            <span style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($order['cost']); ?></span>
                        </div>

                        <a href="<?php echo BASE_URL; ?>/rastrear/<?php echo e($order['id']); ?>" class="btn btn-outline-primary-custom btn-sm mt-auto">
                            Ver seguimiento <i class="bi bi-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
