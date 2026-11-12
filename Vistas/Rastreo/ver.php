<?php
/*====================ENCABEZADO====================
VISTA: seguimiento de un pedido
ARCHIVO: Vistas/Rastreo/ver.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra estado, pasos, mapa del recorrido, rider asignado y costos.
VINCULADO A: Controladores/rastreoController.php::show() define $order y $rider;
    dibuja el mapa con Publico/Recursos/js/mapa.js vía $extraJs.
SI SE ALTERA: si cambian los data-* del mapa, ajustar mapa.js.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$indiceDelPasoActivo = null;
foreach ($order['steps'] as $indice => $paso) {
    if (!$paso['completed']) {
        $indiceDelPasoActivo = $indice;
        break;
    }
}

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
$mensajeWhatsApp = rawurlencode('Hola, consulto por mi pedido ' . $order['id'] . '.');
?>

<nav aria-label="Ruta de navegación" class="pt-3" style="background:var(--surface);">
    <ol class="breadcrumb container mb-0">
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/">Inicio</a></li>
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/rastrear">Rastrear</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?php echo e($order['id']); ?></li>
    </ol>
</nav>

<section class="py-4" style="background:var(--dark-band);color:#fff;">
    <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
                <p class="mb-1" style="font-family:var(--font-mono);font-size:12px;color:var(--primary);letter-spacing:0.08em;"><?php echo e($order['id']); ?></p>
                <h1 class="h3 mb-1" style="color:#fff;"><?php echo e($order['status_label']); ?></h1>
                <p class="mb-0" style="color:rgba(255,255,255,0.6);font-size:14px;">
                    Creado el <?php echo e(date('d/m/Y H:i', strtotime($order['created_at']))); ?>
                </p>
            </div>
            <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo $mensajeWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom">
                <i class="bi bi-whatsapp me-2"></i>Consultar por WhatsApp
            </a>
        </div>
    </div>
</section>

<section class="py-4" style="background:var(--surface);">
    <div class="container">
        <div class="card card-custom p-4">
            <div class="step-progress">
                <?php foreach ($order['steps'] as $indice => $paso): ?>
                    <?php
                    $claseDelPaso = '';
                    if ($paso['completed']) {
                        $claseDelPaso = 'completed';
                    } elseif ($indice === $indiceDelPasoActivo) {
                        $claseDelPaso = 'active';
                    }
                    ?>
                    <div class="step-item <?php echo $claseDelPaso; ?>">
                        <div class="step-circle">
                            <?php if ($paso['completed']): ?>
                                <i class="bi bi-check-lg"></i>
                            <?php else: ?>
                                <?php echo (int) $indice + 1; ?>
                            <?php endif; ?>
                        </div>
                        <span class="mt-2" style="font-size:13px;font-weight:600;"><?php echo e($paso['label']); ?></span>
                        <span style="font-size:12px;color:var(--muted-foreground);"><?php echo e($paso['time'] ?? '—'); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<section class="py-4" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card card-custom p-2">
                    <div id="mapa-rastreo" class="w-100"
                         style="height:360px;"
                         data-centro-lat="<?php echo e($order['origin']['lat']); ?>"
                         data-centro-lng="<?php echo e($order['origin']['lng']); ?>"
                         data-zoom="14"
                         data-origen-lat="<?php echo e($order['origin']['lat']); ?>"
                         data-origen-lng="<?php echo e($order['origin']['lng']); ?>"
                         data-origen-nombre="<?php echo e($order['origin']['name']); ?>"
                         data-destino-lat="<?php echo e($order['destination']['lat']); ?>"
                         data-destino-lng="<?php echo e($order['destination']['lng']); ?>"
                         data-destino-nombre="<?php echo e($order['destination']['name']); ?>"
                         <?php if ($rider): ?>
                         data-rider-lat="<?php echo e($rider['current_lat']); ?>"
                         data-rider-lng="<?php echo e($rider['current_lng']); ?>"
                         data-rider-nombre="<?php echo e($rider['name']); ?>"
                         <?php endif; ?>></div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card card-custom p-4 mb-4">
                    <h2 class="h6 mb-3">Recorrido</h2>
                    <p class="mb-2" style="font-size:14px;">
                        <i class="bi bi-record-circle me-2" style="color:var(--muted);"></i><?php echo e($order['origin']['name']); ?>
                    </p>
                    <p class="mb-3" style="font-size:14px;">
                        <i class="bi bi-geo-alt-fill me-2" style="color:var(--primary);"></i><?php echo e($order['destination']['name']); ?>
                    </p>
                    <div class="d-flex justify-content-between pt-3" style="border-top:1px solid var(--border);font-size:14px;">
                        <span class="text-muted">Distancia</span>
                        <strong><?php echo e($order['distance']); ?> km</strong>
                    </div>
                    <div class="d-flex justify-content-between mt-2" style="font-size:14px;">
                        <span class="text-muted">Costo</span>
                        <strong style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($order['cost']); ?></strong>
                    </div>
                </div>

                <?php if ($rider): ?>
                    <div class="card card-custom p-4">
                        <h2 class="h6 mb-3">Tu rider</h2>
                        <div class="d-flex align-items-center mb-3">
                            <img src="<?php echo e($rider['photo']); ?>" alt="<?php echo e($rider['name']); ?>" style="width:56px;height:56px;object-fit:cover;">
                            <div class="ms-3">
                                <strong class="d-block"><?php echo e($rider['name']); ?></strong>
                                <span style="font-size:13px;color:var(--muted-foreground);"><?php echo e($rider['vehicle']); ?> · <?php echo e($rider['vehicle_plate']); ?></span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between" style="font-size:14px;">
                            <span><i class="bi bi-star-fill me-1" style="color:var(--primary);"></i><?php echo e($rider['rating']); ?></span>
                            <span class="text-muted"><?php echo (int) $rider['total_deliveries']; ?> entregas</span>
                        </div>
                        <a href="tel:<?php echo preg_replace('/[^0-9+]/', '', $rider['phone']); ?>" class="btn btn-outline-primary-custom btn-sm w-100 mt-3">
                            <i class="bi bi-telephone me-2"></i>Llamar al rider
                        </a>
                    </div>
                <?php else: ?>
                    <div class="card card-custom p-4 text-center">
                        <i class="bi bi-hourglass-split mb-2" style="font-size:24px;color:var(--primary);"></i>
                        <p class="mb-0" style="font-size:14px;color:var(--muted-foreground);">Todavía no hay un rider asignado a este pedido.</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

<?php
$extraJs = [BASE_URL . '/Publico/Recursos/js/mapa.js'];
include VIEW_PATH . '/Plantillas/pieSitio.php';
?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
