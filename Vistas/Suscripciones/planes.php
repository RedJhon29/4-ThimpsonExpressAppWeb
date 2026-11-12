<?php
/*====================ENCABEZADO====================
VISTA: planes de suscripción
ARCHIVO: Vistas/Suscripciones/planes.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: compara los planes con precio mensual, anual, entregas y beneficios,
          y enlaza al checkout de cada uno.
VINCULADO A: Controladores/suscripcionController.php::plans() define $plans
    antes del include; ruta /planes/{planId}/checkout.
SI SE ALTERA: si cambian las claves de Modelos/Plan.php, ajustar checkout.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container text-center">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Planes</p>
        <h1 class="h2 mb-2" style="color:#fff;">Elegí cómo trabajar con nosotros</h1>
        <p class="mb-0 mx-auto" style="color:rgba(255,255,255,0.7);max-width:640px;">Pensado para negocios que envían todos los días. Cambiá o cancelá cuando quieras.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4 align-items-stretch">
            <?php foreach ($plans as $plan): ?>
                <div class="col-md-4">
                    <div class="plan-card h-100 <?php echo $plan['popular'] ? 'popular' : ''; ?>">
                        <h2 class="h5 mb-1"><?php echo e($plan['name']); ?></h2>
                        <p class="price mb-0"><?php echo CURRENCY_SYMBOL . number_format($plan['price_monthly']); ?></p>
                        <p class="price-period mb-3">por mes</p>

                        <p class="mb-1" style="font-family:var(--font-mono);font-size:13px;">
                            <?php echo $plan['deliveries_month'] === -1 ? 'Entregas ilimitadas' : (int) $plan['deliveries_month'] . ' entregas/mes'; ?>
                        </p>
                        <p class="mb-4" style="font-size:13px;color:var(--muted-foreground);">
                            Anual: <?php echo CURRENCY_SYMBOL . number_format($plan['price_yearly']); ?>
                        </p>

                        <ul class="list-unstyled text-start mb-4" style="font-size:14px;">
                            <?php foreach ($plan['features'] as $beneficio => $incluido): ?>
                                <li class="mb-2">
                                    <?php if ($incluido): ?>
                                        <i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i><?php echo e($beneficio); ?>
                                    <?php else: ?>
                                        <i class="bi bi-x-circle me-2" style="color:var(--muted);"></i><span style="color:var(--muted);"><?php echo e($beneficio); ?></span>
                                    <?php endif; ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                        <a href="<?php echo BASE_URL; ?>/planes/<?php echo e($plan['id']); ?>/checkout"
                           class="btn <?php echo $plan['popular'] ? 'btn-primary-custom' : 'btn-outline-primary-custom'; ?> w-100">
                            Elegir <?php echo e($plan['name']); ?>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <p class="text-center mt-4 mb-0" style="font-size:13px;color:var(--muted-foreground);">
            Todos los planes incluyen soporte por WhatsApp y seguimiento de pedidos.
        </p>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
