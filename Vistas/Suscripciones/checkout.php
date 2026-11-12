<?php
/*====================ENCABEZADO====================
VISTA: checkout de un plan
ARCHIVO: Vistas/Suscripciones/checkout.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: resume el plan elegido y deriva la confirmación a WhatsApp, sin
          procesar pagos en línea.
VINCULADO A: Controladores/suscripcionController.php::checkout() define $plan
    antes del include; llega desde Suscripciones/planes.php.
SI SE ALTERA: si cambian las claves de Modelos/Plan.php, ajustar planes.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
$mensajeWhatsApp = rawurlencode('Hola, quiero suscribirme al plan ' . $plan['name'] . '.');
?>

<nav aria-label="Ruta de navegación" class="pt-3" style="background:var(--surface);">
    <ol class="breadcrumb container mb-0">
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/">Inicio</a></li>
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/planes">Planes</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?php echo e($plan['name']); ?></li>
    </ol>
</nav>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card card-custom p-4">
                    <h1 class="h4 mb-3">Confirmá tu suscripción</h1>

                    <div class="alert mb-4" style="background:var(--background);border:1px solid var(--border);font-size:14px;">
                        <i class="bi bi-info-circle me-2" style="color:var(--primary);"></i>
                        Esta versión del sitio no procesa pagos en línea. Coordinamos el cobro y la activación por WhatsApp.
                    </div>

                    <h2 class="h6 mb-3">Qué incluye el plan <?php echo e($plan['name']); ?></h2>
                    <ul class="list-unstyled mb-0" style="font-size:14px;">
                        <?php foreach ($plan['features'] as $beneficio => $incluido): ?>
                            <?php if (!$incluido) { continue; } ?>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i><?php echo e($beneficio); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card card-custom p-4">
                    <h2 class="h6 mb-3">Resumen</h2>

                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Plan</span>
                        <strong><?php echo e($plan['name']); ?></strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Precio mensual</span>
                        <strong style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($plan['price_monthly']); ?></strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Precio anual</span>
                        <strong style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($plan['price_yearly']); ?></strong>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <span class="text-muted">Entregas</span>
                        <strong><?php echo $plan['deliveries_month'] === -1 ? 'Ilimitadas' : (int) $plan['deliveries_month'] . ' al mes'; ?></strong>
                    </div>

                    <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo $mensajeWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom w-100 mb-2">
                        <i class="bi bi-whatsapp me-2"></i>Confirmar por WhatsApp
                    </a>
                    <a href="<?php echo BASE_URL; ?>/planes" class="btn btn-outline-primary-custom w-100">Cambiar de plan</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
