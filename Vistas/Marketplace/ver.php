<?php
/*====================ENCABEZADO====================
VISTA: detalle de un negocio afiliado
ARCHIVO: Vistas/Marketplace/ver.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: muestra portada, datos, misión, visión, productos y contacto del negocio.
VINCULADO A: Controladores/tiendaController.php::show() define $business antes
    del include; usa las claves de Modelos/Negocio.php.
SI SE ALTERA: si cambia el modelo, ajustar Marketplace/index.php.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', $business['phone']);
$mensajeWhatsApp = rawurlencode('Hola ' . $business['name'] . ', quiero hacer un pedido por Thimpson Express.');
?>

<nav aria-label="Ruta de navegación" class="pt-3" style="background:var(--surface);">
    <ol class="breadcrumb container mb-0">
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/">Inicio</a></li>
        <li class="breadcrumb-item"><a href="<?php echo BASE_URL; ?>/marketplace">Marketplace</a></li>
        <li class="breadcrumb-item active" aria-current="page"><?php echo e($business['name']); ?></li>
    </ol>
</nav>

<div class="container">
    <img src="<?php echo e($business['cover_image']); ?>" alt="<?php echo e($business['name']); ?>" class="w-100 mt-3" style="height:280px;object-fit:cover;">
</div>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <img src="<?php echo e($business['logo']); ?>" alt="Logo de <?php echo e($business['name']); ?>" style="width:64px;height:64px;object-fit:cover;">
                    <div>
                        <h1 class="h3 mb-1"><?php echo e($business['name']); ?></h1>
                        <div class="d-flex flex-wrap gap-2 align-items-center">
                            <span class="badge" style="background:var(--dark-band);"><?php echo e($business['category']); ?></span>
                            <span class="rating-badge high"><i class="bi bi-star-fill"></i> <?php echo e($business['rating']); ?> · <?php echo (int) $business['reviews_count']; ?> reseñas</span>
                            <?php if ($business['plan'] !== 'free'): ?>
                                <span class="badge" style="background:var(--primary);color:var(--primary-foreground);">Plan <?php echo e(ucfirst($business['plan'])); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <p class="text-muted"><?php echo e($business['description']); ?></p>

                <div class="row g-3 mt-2">
                    <div class="col-md-6">
                        <div class="card card-custom p-3 h-100" style="border-left:4px solid var(--primary);">
                            <h2 class="h6 mb-2"><i class="bi bi-eye me-2" style="color:var(--primary);"></i>Misión</h2>
                            <p class="mb-0 text-muted" style="font-size:14px;"><?php echo e($business['mission']); ?></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card card-custom p-3 h-100" style="border-left:4px solid var(--teal-band);">
                            <h2 class="h6 mb-2"><i class="bi bi-compass me-2" style="color:var(--teal-band);"></i>Visión</h2>
                            <p class="mb-0 text-muted" style="font-size:14px;"><?php echo e($business['vision']); ?></p>
                        </div>
                    </div>
                </div>

                <h2 class="h5 mt-5 mb-3">Productos</h2>
                <div class="table-responsive">
                    <table class="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col" class="text-end">Precio</th>
                                <th scope="col" class="text-end">Disponibilidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($business['products'] as $producto): ?>
                                <tr>
                                    <td><?php echo e($producto['name']); ?></td>
                                    <td class="text-end" style="font-family:var(--font-mono);"><?php echo CURRENCY_SYMBOL . number_format($producto['price']); ?></td>
                                    <td class="text-end">
                                        <?php if ($producto['stock']): ?>
                                            <span class="badge" style="background:var(--success);">Disponible</span>
                                        <?php else: ?>
                                            <span class="badge" style="background:var(--muted);">Agotado</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card card-custom p-4">
                    <h2 class="h6 mb-3">Contacto y pedidos</h2>
                    <ul class="list-unstyled mb-3" style="font-size:14px;">
                        <li class="mb-2"><i class="bi bi-geo-alt me-2" style="color:var(--primary);"></i><?php echo e($business['address']); ?></li>
                        <li class="mb-2"><i class="bi bi-telephone me-2" style="color:var(--primary);"></i><?php echo e($business['phone']); ?></li>
                    </ul>

                    <p class="mb-2" style="font-size:13px;color:var(--muted-foreground);">Servicios disponibles:</p>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <?php foreach ($business['services'] as $servicioDelNegocio): ?>
                            <span class="badge" style="background:var(--background);color:var(--foreground);border:1px solid var(--border);font-weight:500;"><?php echo e($servicioDelNegocio); ?></span>
                        <?php endforeach; ?>
                    </div>

                    <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>?text=<?php echo $mensajeWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom w-100">
                        <i class="bi bi-whatsapp me-2"></i>Pedir por WhatsApp
                    </a>
                </div>

                <div class="card card-custom p-4 mt-3">
                    <h2 class="h6 mb-2">¿Querés vender acá?</h2>
                    <p class="text-muted mb-3" style="font-size:14px;">Sumá tu negocio al marketplace y llegá a más clientes.</p>
                    <a href="<?php echo BASE_URL; ?>/marketplace/registro" class="btn btn-outline-primary-custom btn-sm">Registrar mi negocio</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
