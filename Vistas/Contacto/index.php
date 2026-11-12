<?php
/*====================ENCABEZADO====================
VISTA: contacto
ARCHIVO: Vistas/Contacto/index.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: reúne teléfonos, WhatsApp, ubicación y mapa de Ocotal para contactar.
VINCULADO A: Controladores/estaticoController.php::contact() define $pageTitle
    y $activeMenu; el mapa lo dibuja Publico/Recursos/js/mapa.js vía $extraJs.
SI SE ALTERA: si cambian los data-* del mapa, ajustar mapa.js.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Contacto</p>
        <h1 class="h2 mb-2" style="color:#fff;">Hablemos</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Escribinos por WhatsApp o llamanos. Coordinamos tu servicio el mismo día.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <div class="card card-custom p-4 h-100 text-center">
                    <i class="bi bi-whatsapp mb-2" style="font-size:26px;color:var(--whatsapp);"></i>
                    <h2 class="h6">WhatsApp</h2>
                    <p class="mb-3" style="font-size:14px;color:var(--muted-foreground);"><?php echo e(APP_WHATSAPP); ?></p>
                    <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-primary-custom btn-sm mt-auto">Escribir</a>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card card-custom p-4 h-100 text-center">
                    <i class="bi bi-telephone mb-2" style="font-size:26px;color:var(--primary);"></i>
                    <h2 class="h6">Claro</h2>
                    <p class="mb-3" style="font-size:14px;color:var(--muted-foreground);"><?php echo e(APP_PHONE_CLARO); ?></p>
                    <a href="tel:<?php echo preg_replace('/[^0-9+]/', '', APP_PHONE_CLARO); ?>" class="btn btn-outline-primary-custom btn-sm mt-auto">Llamar</a>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card card-custom p-4 h-100 text-center">
                    <i class="bi bi-telephone mb-2" style="font-size:26px;color:var(--tigo);"></i>
                    <h2 class="h6">Tigo</h2>
                    <p class="mb-3" style="font-size:14px;color:var(--muted-foreground);"><?php echo e(APP_PHONE_TIGO); ?></p>
                    <a href="tel:<?php echo preg_replace('/[^0-9+]/', '', APP_PHONE_TIGO); ?>" class="btn btn-outline-primary-custom btn-sm mt-auto">Llamar</a>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card card-custom p-4 h-100 text-center">
                    <i class="bi bi-geo-alt mb-2" style="font-size:26px;color:var(--teal-band);"></i>
                    <h2 class="h6">Ubicación</h2>
                    <p class="mb-3" style="font-size:14px;color:var(--muted-foreground);"><?php echo e(APP_LOCATION); ?></p>
                    <span class="badge mt-auto" style="background:var(--background);color:var(--foreground);border:1px solid var(--border);font-weight:500;">Ocotal Centro</span>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-4" style="background:var(--surface);">
    <div class="container">
        <div class="card card-custom p-2">
            <div id="mapa-contacto" class="w-100"
                 style="height:360px;"
                 data-centro-lat="13.6324"
                 data-centro-lng="-86.4764"
                 data-zoom="14"
                 data-origen-lat="13.6324"
                 data-origen-lng="-86.4764"
                 data-origen-nombre="<?php echo e(APP_LOCATION); ?>"></div>
        </div>
        <p class="mt-3 mb-0" style="font-size:13px;color:var(--muted-foreground);">
            <i class="bi bi-info-circle me-1"></i>El mapa marca el centro de Ocotal como referencia; la dirección exacta se confirma al coordinar el pedido.
        </p>
    </div>
</section>

<section class="py-5" style="background:var(--primary);">
    <div class="container text-center">
        <h2 class="h3 mb-3" style="color:var(--primary-foreground);">¿Necesitás un mandado ahora?</h2>
        <p class="mb-4" style="color:var(--primary-foreground);opacity:0.8;">Contanos qué necesitás y lo resolvemos.</p>
        <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>" target="_blank" rel="noopener" class="btn btn-lg" style="background:var(--dark-band);color:#fff;">
            <i class="bi bi-whatsapp me-2"></i>Escribir por WhatsApp
        </a>
    </div>
</section>

<?php
$extraJs = [BASE_URL . '/Publico/Recursos/js/mapa.js'];
include VIEW_PATH . '/Plantillas/pieSitio.php';
?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
