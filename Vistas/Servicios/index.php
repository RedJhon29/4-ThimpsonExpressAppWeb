<?php
/*====================ENCABEZADO====================
VISTA: listado de servicios
ARCHIVO: Vistas/Servicios/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra los siete servicios con precio, cobertura y enlace al detalle.
VINCULADO A: Controladores/servicioController.php::index() define $pageTitle,
    $activeMenu y $services antes del include.
SI SE ALTERA: si cambian las claves de Modelos/Servicio.php, ajustar acá y en ver.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Servicios</p>
        <h1 class="h2 mb-2" style="color:#fff;">Todo lo que movemos por vos</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Mandados, delivery, encomiendas, viajes, carga y mudanzas en Ocotal y todo el país. Elegí el servicio y coordinamos por WhatsApp.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <?php foreach ($services as $service): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="card card-custom h-100 p-4">
                        <div class="mb-3" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--background);">
                            <i class="bi bi-<?php echo e($service['icon']); ?>" style="color:var(--primary);font-size:20px;"></i>
                        </div>

                        <h2 class="h5 mb-2"><?php echo e($service['name']); ?></h2>
                        <p class="text-muted" style="font-size:14px;"><?php echo e($service['description']); ?></p>

                        <div class="mb-3">
                            <span class="badge" style="background:var(--teal-band);"><?php echo e($service['price_label']); ?></span>
                        </div>

                        <ul class="list-unstyled mb-4" style="font-size:13px;color:var(--muted-foreground);">
                            <?php foreach (array_slice($service['features'], 0, 3) as $feature): ?>
                                <li class="mb-1">
                                    <i class="bi bi-check2 me-2" style="color:var(--success);"></i><?php echo e($feature); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                        <div class="mt-auto d-flex gap-2 flex-wrap">
                            <a href="<?php echo BASE_URL; ?>/servicios/<?php echo e($service['slug']); ?>" class="btn btn-outline-primary-custom btn-sm">Ver detalle</a>
                            <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo rawurlencode('Hola, quiero solicitar el servicio de ' . $service['name'] . '.'); ?>"
                               target="_blank" rel="noopener" class="btn btn-primary-custom btn-sm">Solicitar</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="py-5" style="background:var(--primary);">
    <div class="container text-center">
        <h2 class="h3 mb-3" style="color:var(--primary-foreground);">¿No sabés qué servicio necesitás?</h2>
        <p class="mb-4" style="color:var(--primary-foreground);opacity:0.8;">Escribinos y te orientamos en minutos.</p>
        <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-lg" style="background:var(--dark-band);color:#fff;">
            <i class="bi bi-whatsapp me-2"></i>Escribir por WhatsApp
        </a>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
