<?php
/*====================ENCABEZADO====================
VISTA: inicio de sesión
ARCHIVO: Vistas/Autenticacion/login.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: presenta el formulario de acceso; el envío se avisa como no
          disponible porque todavía no existe capa de autenticación.
VINCULADO A: Controladores/autenticacionController.php::login(); el aviso lo
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
                    <h1 class="h4 mb-1">Iniciar sesión</h1>
                    <p class="text-muted mb-4" style="font-size:14px;">Accedé para gestionar tus pedidos y tu suscripción.</p>

                    <form class="form-demo" data-mensaje-demo="El inicio de sesión todavía no está habilitado en esta versión. Escribinos por WhatsApp y te ayudamos con tu cuenta.">
                        <div class="mb-3">
                            <label for="correo" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="correo" name="correo" placeholder="vos@correo.com" autocomplete="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="contrasena" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="contrasena" name="contrasena" autocomplete="current-password" required>
                        </div>
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" id="recordarme" name="recordarme">
                            <label class="form-check-label" for="recordarme" style="font-size:14px;">Mantener la sesión abierta</label>
                        </div>
                        <button type="submit" class="btn btn-primary-custom w-100">Entrar</button>
                    </form>

                    <div class="d-flex justify-content-between mt-4" style="font-size:14px;">
                        <a href="<?php echo BASE_URL; ?>/recuperar">Olvidé mi contraseña</a>
                        <a href="<?php echo BASE_URL; ?>/suscribir">Crear cuenta</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include VIEW_PATH . '/Plantillas/pieSitio.php'; ?>
<!--===========FIN DEL FRAGMENTO DE CÓDIGO============-->
