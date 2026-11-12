<?php
/*====================ENCABEZADO====================
VISTA: registro de negocio en el marketplace
ARCHIVO: Vistas/Marketplace/registrar.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: explica requisitos, pasos y planes para afiliar un negocio y deriva
          la solicitud a WhatsApp.
VINCULADO A: Controladores/tiendaController.php::register() define $categories
    y $plans antes del include.
SI SE ALTERA: si cambian los planes, revisar Suscripciones/planes.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
$mensajeWhatsApp = rawurlencode('Hola, quiero registrar mi negocio en el marketplace de Thimpson Express.');
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Marketplace</p>
        <h1 class="h2 mb-2" style="color:#fff;">Registrá tu negocio</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Publicá tus productos, recibí pedidos y entregá con nuestra flotilla. Empezar es gratis.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4 mb-5">
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100 text-center">
                    <div class="mb-3" style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:var(--primary);color:var(--primary-foreground);font-family:var(--font-mono);font-weight:700;margin:0 auto;">1</div>
                    <h2 class="h6">Escribinos</h2>
                    <p class="text-muted mb-0" style="font-size:14px;">Contanos el nombre del negocio, la categoría y tu dirección.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100 text-center">
                    <div class="mb-3" style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:var(--background);font-family:var(--font-mono);font-weight:700;margin:0 auto;">2</div>
                    <h2 class="h6">Cargamos tu catálogo</h2>
                    <p class="text-muted mb-0" style="font-size:14px;">Subimos tus productos, precios y fotos junto a vos.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100 text-center">
                    <div class="mb-3" style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:var(--background);font-family:var(--font-mono);font-weight:700;margin:0 auto;">3</div>
                    <h2 class="h6">Empezás a vender</h2>
                    <p class="text-muted mb-0" style="font-size:14px;">Tus clientes piden y nosotros entregamos en tu nombre.</p>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h5 mb-3">Requisitos</h2>
                    <ul class="list-unstyled mb-0">
                        <li class="mb-2"><i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i>Negocio con dirección física en Ocotal o alrededores.</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i>Teléfono o WhatsApp para recibir pedidos.</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i>Lista de productos con precios actualizados.</li>
                        <li class="mb-2"><i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i>Una categoría del marketplace: <?php echo e(implode(', ', array_column($categories, 'name'))); ?>.</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h5 mb-3">Planes disponibles</h2>
                    <ul class="list-unstyled mb-3">
                        <?php foreach ($plans as $plan): ?>
                            <li class="d-flex justify-content-between align-items-center mb-2 pb-2" style="border-bottom:1px solid var(--border);">
                                <span><?php echo e($plan['name']); ?></span>
                                <span style="font-family:var(--font-mono);font-weight:600;">
                                    <?php echo $plan['price_monthly'] === 0 ? 'Gratis' : CURRENCY_SYMBOL . number_format($plan['price_monthly']) . '/mes'; ?>
                                </span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <a href="<?php echo BASE_URL; ?>/planes" class="btn btn-outline-primary-custom btn-sm">Comparar planes</a>
                </div>
            </div>
        </div>

        <div class="text-center mt-5">
            <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo $mensajeWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom btn-lg">
                <i class="bi bi-whatsapp me-2"></i>Iniciar registro por WhatsApp
            </a>
            <p class="mt-3 mb-0" style="font-size:13px;color:var(--muted-foreground);">Te respondemos en horario de atención, de lunes a sábado.</p>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
