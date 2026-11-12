<?php
/*====================ENCABEZADO====================
VISTA: detalle de un servicio
ARCHIVO: Vistas/Servicios/ver.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra el servicio con sus beneficios, cobertura y municipios,
          y ofrece solicitud directa por WhatsApp.
VINCULADO A: Controladores/servicioController.php::show() define $service y
    $municipalities antes del include.
SI SE ALTERA: si cambia el modelo, ajustar el listado de Servicios/index.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
$mensajeWhatsApp = rawurlencode('Hola, quiero solicitar el servicio de ' . $service['name'] . '.');
?>

<nav aria-label="Ruta de navegación" class="pt-3" style="background:var(--surface);">
    <ol class="breadcrumb container mb-0">
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/">Inicio</a></li>
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/servicios">Servicios</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?php echo e($service['name']); ?></li>
    </ol>
</nav>

<section class="py-5" style="background:var(--dark-band);color:#fff;">
    <div class="container">
        <div class="row align-items-center g-4">
            <div class="col-lg-8">
                <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Servicio</p>
                <h1 class="h2 mb-3" style="color:#fff;">
                    <i class="bi bi-<?php echo e($service['icon']); ?> me-2" style="color:var(--primary);"></i><?php echo e($service['name']); ?>
                </h1>
                <p class="lead mb-4" style="color:rgba(255,255,255,0.7);"><?php echo e($service['description']); ?></p>
                <div class="d-flex gap-2 flex-wrap">
                    <span class="badge" style="background:var(--primary);color:var(--primary-foreground);font-size:14px;padding:8px 12px;"><?php echo e($service['price_label']); ?></span>
                    <?php foreach ($service['coverage'] as $zona): ?>
                        <span class="badge" style="background:rgba(255,255,255,0.12);font-size:12px;padding:8px 12px;"><?php echo e($zona); ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card card-custom p-4" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);">
                    <p class="mb-3" style="color:rgba(255,255,255,0.7);font-size:14px;">Coordinamos tu servicio en minutos.</p>
                    <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo $mensajeWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom w-100 mb-2">
                        <i class="bi bi-whatsapp me-2"></i>Solicitar por WhatsApp
                    </a>
                    <a href="tel:<?php echo preg_replace('/[^0-9+]/', '', APP_PHONE_CLARO); ?>" class="btn btn-outline-dark-custom w-100">
                        <i class="bi bi-telephone me-2"></i><?php echo e(APP_PHONE_CLARO); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h5 mb-3">Qué incluye</h2>
                    <ul class="list-unstyled mb-0">
                        <?php foreach ($service['features'] as $feature): ?>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill me-2" style="color:var(--success);"></i><?php echo e($feature); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h5 mb-3">Municipios con cobertura</h2>
                    <div class="d-flex flex-wrap gap-2">
                        <?php foreach ($municipalities as $municipio): ?>
                            <span class="badge" style="background:var(--background);color:var(--foreground);border:1px solid var(--border);font-weight:500;padding:6px 10px;">
                                <?php echo e($municipio['label']); ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                    <p class="mt-3 mb-0" style="font-size:13px;color:var(--muted-foreground);">
                        El precio final se confirma según el municipio y la distancia del recorrido.
                    </p>
                </div>
            </div>
        </div>

        <div class="text-center mt-4">
            <a href="<?php echo BASE_URL; ?>/servicios" class="btn btn-outline-primary-custom">
                <i class="bi bi-arrow-left me-2"></i>Volver a servicios
            </a>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
