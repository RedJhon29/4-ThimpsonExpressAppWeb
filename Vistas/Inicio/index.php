<?php include VIEW_PATH . '/Plantillas/encabezadoSitio.php'; ?>

<!-- Hero Section (Dark) -->
<section class="hero-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <p class="mb-3" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Servicio Express</p>
                <h1 class="mb-3">Servicio Express<br><span style="color:var(--primary);">Thimpson</span></h1>
                <p class="lead mb-4">Mandados, delivery, encomiendas y más en Ocotal, Nueva Segovia. Rápido, confiable y seguro.</p>
                <div class="d-flex gap-3">
                    <a href="<?php echo BASE_URL; ?>/servicios" class="btn btn-primary-custom btn-lg">
                        <i class="bi bi-arrow-right me-2"></i>Ver Servicios
                    </a>
                    <a href="<?php echo BASE_URL; ?>/marketplace" class="btn btn-outline-dark-custom btn-lg">
                        <i class="bi bi-shop me-2"></i>Marketplace
                    </a>
                </div>
            </div>
            <div class="col-lg-6 text-center mt-4 mt-lg-0">
                <div style="font-size:120px;opacity:0.15;color:var(--primary);">
                    <i class="bi bi-truck"></i>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Servicios Destacados (White) -->
<section style="background:var(--surface);padding:64px 0;">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow">Nuestros Servicios</p>
            <h2>Soluciones para vos</h2>
        </div>
        <div class="row g-4">
            <?php foreach (array_slice($services, 0, 4) as $service): ?>
                <div class="col-md-6 col-lg-3">
                    <div class="card card-custom h-100 p-4">
                        <div class="mb-3">
                            <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--surface-3);font-size:20px;">
                                <i class="bi bi-<?php echo $service['icon']; ?>" style="color:var(--primary);"></i>
                            </div>
                        </div>
                        <h5 class="card-title" style="font-size:16px;"><?php echo $service['name']; ?></h5>
                        <p class="text-muted" style="font-size:14px;"><?php echo $service['description']; ?></p>
                        <div class="mt-auto">
                            <span style="display:inline-block;padding:3px 8px;background:var(--teal-band);color:#fff;font-family:var(--font-mono);font-size:12px;font-weight:600;">
                                <?php echo $service['price_label']; ?>
                            </span>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="text-center mt-4">
            <a href="<?php echo BASE_URL; ?>/servicios" class="btn btn-outline-primary-custom">
                Ver todos los servicios <i class="bi bi-arrow-right ms-2"></i>
            </a>
        </div>
    </div>
</section>

<!-- 3 Pasos (Teal Band) -->
<section style="background:var(--teal-band);padding:64px 0;color:#fff;">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow" style="color:var(--primary);">¿Cómo funciona?</p>
            <h2 style="color:#fff;">En 3 simples pasos</h2>
        </div>
        <div class="row g-4">
            <div class="col-md-4 text-center">
                <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:var(--primary);color:var(--primary-foreground);font-size:24px;font-weight:700;margin:0 auto 16px;font-family:var(--font-mono);">1</div>
                <h5 style="color:#fff;">Solicitá</h5>
                <p style="color:rgba(255,255,255,0.7);font-size:14px;">Elegí el servicio que necesitás y completá el formulario.</p>
            </div>
            <div class="col-md-4 text-center">
                <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:24px;font-weight:700;margin:0 auto 16px;font-family:var(--font-mono);">2</div>
                <h5 style="color:#fff;">Te asignamos</h5>
                <p style="color:rgba(255,255,255,0.7);font-size:14px;">Un rider cercano acepta tu pedido y va por tu paquete.</p>
            </div>
            <div class="col-md-4 text-center">
                <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:24px;font-weight:700;margin:0 auto 16px;font-family:var(--font-mono);">3</div>
                <h5 style="color:#fff;">Recibís</h5>
                <p style="color:rgba(255,255,255,0.7);font-size:14px;">Seguí tu pedido en tiempo real y recibilo en tu puerta.</p>
            </div>
        </div>
    </div>
</section>

<!-- Misión y Visión (White) -->
<section style="background:var(--surface);padding:64px 0;">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-custom p-4 h-100" style="border-left:4px solid var(--primary);">
                    <h4 style="font-size:18px;"><i class="bi bi-eye me-2" style="color:var(--primary);"></i>Misión</h4>
                    <p class="mb-0 text-muted" style="font-size:14px;">Brindar soluciones de logística y delivery rápidas, seguras y confiables para los nicaragüenses, conectando personas y negocios en todo el país.</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-custom p-4 h-100" style="border-left:4px solid var(--teal-band);">
                    <h4 style="font-size:18px;"><i class="bi bi-compass me-2" style="color:var(--teal-band);"></i>Visión</h4>
                    <p class="mb-0 text-muted" style="font-size:14px;">Ser la empresa líder de servicios express y delivery en Nicaragua, reconocida por nuestra innovación, calidad y compromiso con el cliente.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Marketplace Destacado (White) -->
<section style="background:var(--surface);padding:64px 0;">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow">Marketplace</p>
            <h2>Negocios afiliados</h2>
        </div>
        <div class="row g-4">
            <?php foreach (array_slice($businesses, 0, 3) as $business): ?>
                <div class="col-md-4">
                    <div class="card card-custom h-100">
                        <img src="<?php echo $business['cover_image']; ?>" class="card-img-top" alt="<?php echo $business['name']; ?>" style="height:180px;object-fit:cover;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title mb-0" style="font-size:16px;"><?php echo $business['name']; ?></h5>
                                <span class="rating-badge high">
                                    <i class="bi bi-star-fill"></i> <?php echo $business['rating']; ?>
                                </span>
                            </div>
                            <span style="display:inline-block;padding:2px 8px;background:var(--dark-band);color:#fff;font-size:11px;font-weight:600;margin-bottom:8px;"><?php echo $business['category']; ?></span>
                            <p class="text-muted" style="font-size:14px;"><?php echo substr($business['description'], 0, 80); ?>...</p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="text-center mt-4">
            <a href="<?php echo BASE_URL; ?>/marketplace" class="btn btn-primary-custom">
                Ver marketplace <i class="bi bi-arrow-right ms-2"></i>
            </a>
        </div>
    </div>
</section>

<!-- Testimonios (Teal Band) -->
<section style="background:var(--teal-band);padding:64px 0;color:#fff;">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow" style="color:var(--primary);">Testimonios</p>
            <h2 style="color:#fff;">Lo que dicen nuestros clientes</h2>
        </div>
        <div class="row g-4">
            <?php foreach ($testimonials as $testimonial): ?>
                <div class="col-md-4">
                    <div class="card card-custom p-4 h-100" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);">
                        <div class="stars mb-2">
                            <?php for ($i = 0; $i < $testimonial['rating']; $i++): ?>
                                <i class="bi bi-star-fill"></i>
                            <?php endfor; ?>
                        </div>
                        <p class="mb-3" style="color:rgba(255,255,255,0.8);font-size:14px;">"<?php echo $testimonial['text']; ?>"</p>
                        <div class="d-flex align-items-center">
                            <img src="<?php echo $testimonial['avatar']; ?>" alt="<?php echo $testimonial['name']; ?>" style="width:40px;height:40px;object-fit:cover;">
                            <div class="ms-3">
                                <strong style="color:#fff;"><?php echo $testimonial['name']; ?></strong>
                                <small class="d-block" style="color:var(--muted);"><?php echo $testimonial['role']; ?></small>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- CTA Final (Primary) -->
<section style="background:var(--primary);padding:64px 0;">
    <div class="container text-center">
        <h2 class="mb-3" style="color:var(--primary-foreground);">¿Necesitás un mandado o delivery ahora?</h2>
        <p class="mb-4" style="color:var(--primary-foreground);opacity:0.8;">Solicitá ahora mismo o contactanos por WhatsApp.</p>
        <div class="d-flex justify-content-center gap-3">
            <a href="<?php echo BASE_URL; ?>/servicios" class="btn btn-lg" style="background:var(--dark-band);color:#fff;">
                <i class="bi bi-arrow-right me-2"></i>Solicitar Ahora
            </a>
            <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', APP_WHATSAPP); ?>" target="_blank" class="btn btn-lg" style="background:var(--whatsapp);color:#fff;">
                <i class="bi bi-whatsapp me-2"></i>WhatsApp
            </a>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
