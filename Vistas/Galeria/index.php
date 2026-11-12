<?php
/*====================ENCABEZADO====================
VISTA: galería de imágenes
ARCHIVO: Vistas/Galeria/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra la galería de entregas, equipo, vehículos y oficina.
VINCULADO A: Controladores/estaticoController.php::gallery() define
    $galleryItems antes del include.
SI SE ALTERA: si cambia Modelos/Calificacion.php::getGallery(), ajustar acá.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Galería</p>
        <h1 class="h2 mb-2" style="color:#fff;">Así trabajamos</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Entregas, equipo, vehículos y atención al cliente en el día a día.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <?php if (empty($galleryItems)): ?>
            <div class="card card-custom p-4 text-center">
                <p class="mb-0">Todavía no hay imágenes cargadas.</p>
            </div>
        <?php else: ?>
            <div class="row g-4">
                <?php foreach ($galleryItems as $imagen): ?>
                    <div class="col-md-6 col-lg-4">
                        <figure class="card card-custom h-100 mb-0">
                            <img src="<?php echo e($imagen['url']); ?>" class="card-img-top" alt="<?php echo e($imagen['title']); ?>" style="height:240px;object-fit:cover;">
                            <figcaption class="card-body">
                                <h2 class="h6 mb-1"><?php echo e($imagen['title']); ?></h2>
                                <span class="badge" style="background:var(--dark-band);text-transform:capitalize;"><?php echo e($imagen['category']); ?></span>
                            </figcaption>
                        </figure>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
