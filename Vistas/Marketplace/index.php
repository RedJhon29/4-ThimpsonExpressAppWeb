<?php
/*====================ENCABEZADO====================
VISTA: listado del marketplace
ARCHIVO: Vistas/Marketplace/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: lista los negocios afiliados y filtra por categoría con ?categoria=.
VINCULADO A: Controladores/tiendaController.php::index() define $businesses,
    $categories y $categoriaActiva antes del include.
SI SE ALTERA: si cambian las claves de Modelos/Negocio.php, ajustar acá y ver.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Marketplace</p>
        <h1 class="h2 mb-2" style="color:#fff;">Negocios afiliados</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Pedí a los negocios de Ocotal y recibí en tu puerta con Thimpson Express.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="d-flex flex-wrap gap-2 mb-4">
            <?php foreach ($categories as $categoria): ?>
                <?php $esActiva = $categoria['slug'] === $categoriaActiva; ?>
                <a href="<?php echo BASE_URL; ?>/marketplace?categoria=<?php echo e($categoria['slug']); ?>"
                   class="btn btn-sm <?php echo $esActiva ? 'btn-primary-custom' : 'btn-outline-primary-custom'; ?>">
                    <?php echo e($categoria['name']); ?> (<?php echo (int) $categoria['count']; ?>)
                </a>
            <?php endforeach; ?>
        </div>

        <?php if (empty($businesses)): ?>
            <div class="card card-custom p-4 text-center">
                <p class="mb-2">Todavía no hay negocios en esta categoría.</p>
                <a href="<?php echo BASE_URL; ?>/marketplace" class="btn btn-outline-primary-custom btn-sm">Ver todos</a>
            </div>
        <?php else: ?>
            <div class="row g-4">
                <?php foreach ($businesses as $business): ?>
                    <?php
                    $claseCalificacion = 'low';
                    if ($business['rating'] >= 4.5) {
                        $claseCalificacion = 'high';
                    } elseif ($business['rating'] >= 3.5) {
                        $claseCalificacion = 'medium';
                    }
                    ?>
                    <div class="col-md-6 col-lg-4">
                        <div class="card card-custom h-100">
                            <img src="<?php echo e($business['cover_image']); ?>" class="card-img-top" alt="<?php echo e($business['name']); ?>" style="height:180px;object-fit:cover;">
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h2 class="h6 mb-0"><?php echo e($business['name']); ?></h2>
                                    <span class="rating-badge <?php echo $claseCalificacion; ?>">
                                        <i class="bi bi-star-fill"></i> <?php echo e($business['rating']); ?>
                                    </span>
                                </div>
                                <span class="badge align-self-start mb-2" style="background:var(--dark-band);"><?php echo e($business['category']); ?></span>
                                <p class="text-muted mb-2" style="font-size:14px;"><?php echo e($business['description']); ?></p>
                                <p class="mb-3" style="font-size:12px;color:var(--muted-foreground);">
                                    <i class="bi bi-chat-left-text me-1"></i><?php echo (int) $business['reviews_count']; ?> reseñas
                                    · <i class="bi bi-geo-alt me-1"></i><?php echo e($business['address']); ?>
                                </p>
                                <a href="<?php echo BASE_URL; ?>/marketplace/<?php echo e($business['slug']); ?>" class="btn btn-primary-custom btn-sm mt-auto">
                                    Ver negocio <i class="bi bi-arrow-right ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="text-center mt-5">
            <p class="text-muted mb-3">¿Tenés un negocio en Ocotal?</p>
            <a href="<?php echo BASE_URL; ?>/marketplace/registro" class="btn btn-outline-primary-custom">
                <i class="bi bi-shop me-2"></i>Registrar mi negocio
            </a>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
