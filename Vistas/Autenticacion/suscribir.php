<?php
/*====================ENCABEZADO====================
VISTA: crear cuenta / suscribirse
ARCHIVO: Vistas/Autenticacion/suscribir.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: pide los datos del negocio para crear la cuenta y deriva el alta a
          WhatsApp, sin procesar pagos ni sesiones.
VINCULADO A: Controladores/autenticacionController.php::subscribe(); el aviso
    lo maneja Publico/Recursos/js/app.js con la clase .form-demo.
SI SE ALTERA: cuando exista backend de sesión, reemplazar el formulario y app.js.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

include VIEW_PATH . '/Plantillas/encabezadoSitio.php';

$numeroWhatsApp = preg_replace('/[^0-9]/', '', APP_WHATSAPP);
?>

<section class="py-5" style="background:var(--teal-band);">
    <div class="container">
        <p class="mb-2" style="font-family:var(--font-mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--primary);font-weight:500;">Cuenta</p>
        <h1 class="h2 mb-2" style="color:#fff;">Creá tu cuenta</h1>
        <p class="mb-0" style="color:rgba(255,255,255,0.7);max-width:640px;">Empezá con el plan gratis y cambiá cuando tu negocio lo necesite.</p>
    </div>
</section>

<section class="py-5" style="background:var(--surface);">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card card-custom p-4 p-md-5">
                    <form class="form-demo" data-mensaje-demo="El alta automática todavía no está habilitada. Escribinos por WhatsApp y creamos tu cuenta en minutos.">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="nombre" class="form-label">Nombre completo</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" autocomplete="name" required>
                            </div>
                            <div class="col-md-6">
                                <label for="negocio" class="form-label">Nombre del negocio</label>
                                <input type="text" class="form-control" id="negocio" name="negocio" required>
                            </div>
                            <div class="col-md-6">
                                <label for="correo" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="correo" name="correo" autocomplete="email" required>
                            </div>
                            <div class="col-md-6">
                                <label for="telefono" class="form-label">Teléfono o WhatsApp</label>
                                <input type="tel" class="form-control" id="telefono" name="telefono" autocomplete="tel" required>
                            </div>
                            <div class="col-12">
                                <label for="contrasena" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena" autocomplete="new-password" minlength="8" required>
                                <div class="form-text">Mínimo 8 caracteres.</div>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="acepta" name="acepta" required>
                                    <label class="form-check-label" for="acepta" style="font-size:14px;">
                                        Acepto que me contacten para coordinar el servicio.
                                    </label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary-custom w-100">Crear cuenta</button>
                            </div>
                        </div>
                    </form>

                    <div class="d-flex justify-content-between mt-4" style="font-size:14px;">
                        <a href="<?php echo BASE_URL; ?>/planes">Ver planes</a>
                        <a href="<?php echo BASE_URL; ?>/login">Ya tengo cuenta</a>
                    </div>

                    <p class="mt-4 mb-0 text-center" style="font-size:13px;color:var(--muted-foreground);">
                        ¿Preferís hacerlo directo?
                        <a href="https://wa.me/<?php echo $numeroWhatsApp; ?>" target="_blank" rel="noopener">Escribinos por WhatsApp</a>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
