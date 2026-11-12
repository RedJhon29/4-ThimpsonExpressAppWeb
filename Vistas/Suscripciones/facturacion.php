<?php
/*====================ENCABEZADO====================
VISTA: facturación de la suscripción
ARCHIVO: Vistas/Suscripciones/facturacion.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra plan actual, consumo de entregas, facturas y métodos de pago.
VINCULADO A: Controladores/suscripcionController.php::billing() define
    $subscription, $invoices y $paymentMethods antes del include.
SI SE ALTERA: si cambian los modelos Suscripcion o Facturacion, ajustar acá.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$limiteDeEntregas = (int) $subscription['deliveries_limit'];
$entregasUsadas = (int) $subscription['deliveries_used'];
$porcentajeDeUso = $limiteDeEntregas > 0 ? (int) round(($entregasUsadas / $limiteDeEntregas) * 100) : 0;
$porcentajeDeUso = max(0, min(100, $porcentajeDeUso));
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Mi cuenta</p>
        <h1 class="h2 mb-2" style="color:#fff;">Facturación</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);">Tu plan, tu consumo y tus comprobantes en un solo lugar.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4 mb-5">
            <div class="col-lg-6">
                <div class="card card-custom p-4 h-100">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h2 class="h5 mb-0">Plan <?php echo e($subscription['plan_name']); ?></h2>
                        <span class="badge" style="background:var(--success);">Activo</span>
                    </div>
                    <p class="text-muted mb-3" style="font-size:14px;">
                        Ciclo <?php echo $subscription['cycle'] === 'yearly' ? 'anual' : 'mensual'; ?>
                        · Renueva el <?php echo e(date('d/m/Y', strtotime($subscription['renewal_date']))); ?>
                    </p>

                    <div class="d-flex justify-content-between mb-1" style="font-size:13px;">
                        <span class="text-muted">Entregas usadas</span>
                        <span style="font-family:var(--font-mono);"><?php echo $entregasUsadas; ?> / <?php echo $limiteDeEntregas; ?></span>
                    </div>
                    <div class="progress mb-3" style="height:10px;background:var(--background);">
                        <div class="progress-bar" role="progressbar" style="width:<?php echo $porcentajeDeUso; ?>%;background:var(--primary);"
                             aria-valuenow="<?php echo $porcentajeDeUso; ?>" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <a href="<?php echo BASE_URL; ?>/planes" class="btn btn-outline-primary-custom btn-sm align-self-start">Cambiar de plan</a>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h5 mb-3">Métodos de pago</h2>
                    <ul class="list-unstyled mb-0">
                        <?php foreach ($paymentMethods as $metodo): ?>
                            <li class="d-flex align-items-start mb-3">
                                <?php if ($metodo['type'] === 'card'): ?>
                                    <i class="bi bi-credit-card me-3" style="color:var(--primary);font-size:20px;"></i>
                                    <div>
                                        <strong><?php echo e($metodo['brand']); ?> •••• <?php echo e($metodo['last4']); ?></strong>
                                        <div style="font-size:13px;color:var(--muted-foreground);">Vence <?php echo e($metodo['expiry']); ?></div>
                                    </div>
                                <?php elseif ($metodo['type'] === 'transfer'): ?>
                                    <i class="bi bi-bank me-3" style="color:var(--primary);font-size:20px;"></i>
                                    <div>
                                        <strong><?php echo e($metodo['bank']); ?></strong>
                                        <div style="font-size:13px;color:var(--muted-foreground);">Cuenta <?php echo e($metodo['account']); ?></div>
                                    </div>
                                <?php else: ?>
                                    <i class="bi bi-phone me-3" style="color:var(--primary);font-size:20px;"></i>
                                    <div>
                                        <strong><?php echo e($metodo['provider']); ?></strong>
                                        <div style="font-size:13px;color:var(--muted-foreground);"><?php echo e($metodo['phone']); ?></div>
                                    </div>
                                <?php endif; ?>

                                <?php if (!empty($metodo['default'])): ?>
                                    <span class="badge ms-auto" style="background:var(--dark-band);">Predeterminado</span>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>

        <h2 class="h5 mb-3">Facturas</h2>
        <div class="table-responsive">
            <table class="table align-middle" style="background:var(--surface);">
                <thead>
                    <tr>
                        <th scope="col">Factura</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Plan</th>
                        <th scope="col" class="text-end">Monto</th>
                        <th scope="col" class="text-end">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($invoices as $factura): ?>
                        <tr>
                            <td style="font-family:var(--font-mono);font-size:13px;"><?php echo e($factura['id']); ?></td>
                            <td><?php echo e(date('d/m/Y', strtotime($factura['date']))); ?></td>
                            <td><?php echo e($factura['plan']); ?></td>
                            <td class="text-end" style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($factura['amount']); ?></td>
                            <td class="text-end">
                                <?php if ($factura['status'] === 'Pagada'): ?>
                                    <span class="badge" style="background:var(--success);">Pagada</span>
                                <?php else: ?>
                                    <span class="badge" style="background:var(--primary);color:var(--primary-foreground);"><?php echo e($factura['status']); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
