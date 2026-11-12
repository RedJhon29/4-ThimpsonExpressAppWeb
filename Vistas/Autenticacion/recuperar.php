<?php
/*====================ENCABEZADO====================
VISTA: recuperar contraseña
ARCHIVO: Vistas/Autenticacion/recuperar.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: pide el correo para recuperar la cuenta y explica los pasos; el
          envío se avisa como no disponible sin backend de autenticación.
VINCULADO A: Controladores/autenticacionController.php::recover(); el aviso lo
    maneja Publico/Recursos/js/app.js con la clase .form-demo.
SI SE ALTERA: cuando exista backend de sesión, reemplazar el formulario y app.js.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';
?>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-7 col-lg-5">
                <div class="card card-custom p-4 p-md-5">
                    <h1 class="h4 mb-1">Recuperar contraseña</h1>
                    <p class="text-muted mb-4" style="font-size:14px;">Ingresá tu correo y te enviamos las instrucciones.</p>

                    <form class="form-demo" data-mensaje-demo="La recuperación automática todavía no está habilitada. Escribinos por WhatsApp y restablecemos tu acceso.">
                        <div class="mb-4">
                            <label for="correo" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="correo" name="correo" placeholder="vos@correo.com" autocomplete="email" required>
                        </div>
                        <button type="submit" class="btn btn-primary-custom w-100">Enviar instrucciones</button>
                    </form>

                    <div class="mt-4" style="font-size:14px;">
                        <a href="<?php echo BASE_URL; ?>/login"><i class="bi bi-arrow-left me-1"></i>Volver al inicio de sesión</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
