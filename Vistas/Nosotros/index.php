<?php
/*====================ENCABEZADO====================
VISTA: sobre nosotros
ARCHIVO: Vistas/Nosotros/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: presenta la empresa, su misión, visión, valores y testimonios reales
          del modelo de calificaciones.
VINCULADO A: Controladores/estaticoController.php::about() define $testimonials
    antes del include.
SI SE ALTERA: si cambia Modelos/Calificacion.php, ajustar los testimonios.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Nosotros</p>
        <h1 class="h2 mb-2" style="color:#fff;">Somos de acá, entregamos acá</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:680px;">
            Thimpson Express nació en Ocotal para resolver un problema simple: mover lo que necesitás, cuando lo necesitás, sin vueltas.
        </p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4 align-items-center">
            <div class="col-lg-6">
                <h2 class="h3 mb-3">Nuestra historia</h2>
                <p class="text-muted">
                    Empezamos como un servicio de mandados en el centro de Ocotal y hoy cubrimos delivery,
                    encomiendas, viajes, carga y mudanzas. Trabajamos con negocios locales que necesitan
                    entregar sin montar su propia logística.
                </p>
                <p class="text-muted mb-0">
                    Cada pedido lo sigue una persona real: el rider asignado, con nombre, vehículo y
                    calificación visible. Sin intermediarios ni letra chiquita.
                </p>
            </div>
            <div class="col-lg-6">
                <div class="row g-3">
                    <div class="col-6">
                        <div class="card card-custom p-3 h-100 text-center">
                            <i class="bi bi-geo-alt mb-2" style="font-size:24px;color:var(--primary);"></i>
                            <strong class="d-block">Ocotal</strong>
                            <span style="font-size:13px;color:var(--muted-foreground);">Nueva Segovia</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card card-custom p-3 h-100 text-center">
                            <i class="bi bi-truck mb-2" style="font-size:24px;color:var(--primary);"></i>
                            <strong class="d-block">7 servicios</strong>
                            <span style="font-size:13px;color:var(--muted-foreground);">Mandados a mudanzas</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card card-custom p-3 h-100 text-center">
                            <i class="bi bi-phone mb-2" style="font-size:24px;color:var(--primary);"></i>
                            <strong class="d-block">2 líneas</strong>
                            <span style="font-size:13px;color:var(--muted-foreground);">Claro y Tigo</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card card-custom p-3 h-100 text-center">
                            <i class="bi bi-whatsapp mb-2" style="font-size:24px;color:var(--whatsapp);"></i>
                            <strong class="d-block">WhatsApp</strong>
                            <span style="font-size:13px;color:var(--muted-foreground);">Atención directa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5" style="background:var(--background);">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-custom p-4 h-100" style="border-left:4px solid var(--primary);">
                    <h2 class="h5 mb-2"><i class="bi bi-eye me-2" style="color:var(--primary);"></i>Misión</h2>
                    <p class="mb-0 text-muted" style="font-size:14px;">
                        Brindar soluciones de logística y delivery rápidas, seguras y confiables para los
                        nicaragüenses, conectando personas y negocios en todo el país.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-custom p-4 h-100" style="border-left:4px solid var(--teal-band);">
                    <h2 class="h5 mb-2"><i class="bi bi-compass me-2" style="color:var(--teal-band);"></i>Visión</h2>
                    <p class="mb-0 text-muted" style="font-size:14px;">
                        Ser la empresa líder de servicios express y delivery en Nicaragua, reconocida por
                        nuestra innovación, calidad y compromiso con el cliente.
                    </p>
                </div>
            </div>
        </div>

        <div class="row g-4 mt-1">
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h6 mb-2"><i class="bi bi-shield-check me-2" style="color:var(--success);"></i>Responsabilidad</h2>
                    <p class="mb-0 text-muted" style="font-size:14px;">Cada paquete se registra y se sigue hasta la entrega.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h6 mb-2"><i class="bi bi-lightning-charge me-2" style="color:var(--primary);"></i>Rapidez</h2>
                    <p class="mb-0 text-muted" style="font-size:14px;">Coordinamos por WhatsApp y asignamos el rider más cercano.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-custom p-4 h-100">
                    <h2 class="h6 mb-2"><i class="bi bi-people me-2" style="color:var(--teal-band);"></i>Cercanía</h2>
                    <p class="mb-0 text-muted" style="font-size:14px;">Hablás con personas del barrio, no con un robot.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5" style="background:var(--teal-band);color:#fff;">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow" style="color:var(--primary);">Testimonios</p>
            <h2 style="color:#fff;">Lo que dicen nuestros clientes</h2>
        </div>
        <div class="row g-4">
            <?php foreach ($testimonials as $testimonio): ?>
                <div class="col-md-4">
                    <div class="card card-custom p-4 h-100" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);">
                        <div class="stars mb-2">
                            <?php for ($estrella = 0; $estrella < (int) $testimonio['rating']; $estrella++): ?>
                                <i class="bi bi-star-fill"></i>
                            <?php endfor; ?>
                        </div>
                        <p class="mb-3" style="color:rgba(255,255,255,0.8);font-size:14px;">«<?php echo e($testimonio['text']); ?>»</p>
                        <div class="d-flex align-items-center">
                            <img src="<?php echo e($testimonio['avatar']); ?>" alt="<?php echo e($testimonio['name']); ?>" style="width:40px;height:40px;object-fit:cover;">
                            <div class="ms-3">
                                <strong style="color:#fff;"><?php echo e($testimonio['name']); ?></strong>
                                <small class="d-block" style="color:var(--muted);"><?php echo e($testimonio['role']); ?></small>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
