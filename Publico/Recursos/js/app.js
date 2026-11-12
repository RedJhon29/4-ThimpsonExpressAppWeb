/*====================ENCABEZADO====================
SCRIPT: app.js — interacciones comunes del sitio
ARCHIVO: Publico/Recursos/js/app.js
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: activa el botón volver arriba, el chat del asistente y el aviso de
          los formularios que todavía no tienen backend.
VINCULADO A: lo carga Plantillas/pieSitio.php en todas las páginas; usa los ids
          backToTop, chatToggle, chatWidget, chatClose, chatBody, chatInput y chatSend.
SI SE ALTERA: si se renombran esos ids en la plantilla, actualizar este archivo.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

(function () {
    'use strict';

    // El propio <script> revela la raíz del sitio sin depender de BASE_URL
    var urlBase = '';
    if (document.currentScript && document.currentScript.src) {
        urlBase = new URL(document.currentScript.src).pathname.replace(/\/Publico\/Recursos\/js\/app\.js$/, '');
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: iniciarBotonVolverArriba() | ROL: script de vista
     * =====================DETALLES=====================
     * QUÉ HACE: muestra el botón tras 300px de scroll y vuelve arriba al tocarlo.
     * VINCULADO A: el botón #backToTop de Plantillas/pieSitio.php.
     * SI SE ALTERA: revisar la clase .float-btn-back-to-top de custom.css.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function iniciarBotonVolverArriba() {
        var boton = document.getElementById('backToTop');
        if (!boton) {
            return;
        }

        var actualizarVisibilidad = function () {
            boton.style.display = window.scrollY > 300 ? 'flex' : 'none';
        };

        window.addEventListener('scroll', actualizarVisibilidad);
        actualizarVisibilidad();

        boton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: agregarMensajeAlChat() | ROL: helper de UI
     * =====================DETALLES=====================
     * QUÉ HACE: agrega una burbuja al chat usando textContent, sin inyectar HTML.
     * VINCULADO A: la llama iniciarChat(); escribe en #chatBody.
     * SI SE ALTERA: revisar las clases .chat-message y .chat-bubble de custom.css.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function agregarMensajeAlChat(texto, autor) {
        var cuerpo = document.getElementById('chatBody');
        if (!cuerpo) {
            return;
        }

        var contenedor = document.createElement('div');
        contenedor.className = 'chat-message ' + autor;

        var burbuja = document.createElement('div');
        burbuja.className = 'chat-bubble ' + autor;
        burbuja.textContent = texto;

        contenedor.appendChild(burbuja);
        cuerpo.appendChild(contenedor);
        cuerpo.scrollTop = cuerpo.scrollHeight;
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: redactarRespuestaDelAsistente() | ROL: helper de UI
     * =====================DETALLES=====================
     * QUÉ HACE: responde por palabra clave con el enlace útil del sitio.
     * VINCULADO A: la llama iniciarChat(); usa urlBase de este mismo archivo.
     * SI SE ALTERA: si cambian las rutas de index.php, actualizar los enlaces.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function redactarRespuestaDelAsistente(mensaje) {
        var texto = mensaje.toLowerCase();

        if (texto.indexOf('rastre') !== -1 || texto.indexOf('pedido') !== -1) {
            return 'Podés seguir tu pedido con el código que te enviamos en ' + urlBase + '/rastrear';
        }
        if (texto.indexOf('plan') !== -1 || texto.indexOf('suscri') !== -1) {
            return 'Los planes y precios están en ' + urlBase + '/planes';
        }
        if (texto.indexOf('precio') !== -1 || texto.indexOf('costo') !== -1 || texto.indexOf('cuanto') !== -1) {
            return 'El precio de cada servicio está en ' + urlBase + '/servicios';
        }
        return 'Para una respuesta puntual, escribinos por WhatsApp con el botón verde de la esquina.';
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: iniciarChat() | ROL: script de vista
     * =====================DETALLES=====================
     * QUÉ HACE: abre y cierra el chat, y responde con una guía fija del sitio.
     * VINCULADO A: el widget #chatWidget de Plantillas/pieSitio.php.
     * SI SE ALTERA: revisar los ids del widget y la clase .chat-widget.active.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function iniciarChat() {
        var botonAbrir = document.getElementById('chatToggle');
        var widget = document.getElementById('chatWidget');
        var botonCerrar = document.getElementById('chatClose');
        var campo = document.getElementById('chatInput');
        var botonEnviar = document.getElementById('chatSend');

        if (!botonAbrir || !widget || !campo || !botonEnviar) {
            return;
        }

        var alternarWidget = function () {
            widget.classList.toggle('active');
        };

        var enviarMensaje = function () {
            var mensaje = campo.value.trim();
            if (mensaje === '') {
                return;
            }

            agregarMensajeAlChat(mensaje, 'user');
            campo.value = '';

            window.setTimeout(function () {
                agregarMensajeAlChat(redactarRespuestaDelAsistente(mensaje), 'bot');
            }, 400);
        };

        botonAbrir.addEventListener('click', alternarWidget);
        if (botonCerrar) {
            botonCerrar.addEventListener('click', alternarWidget);
        }
        botonEnviar.addEventListener('click', enviarMensaje);
        campo.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter') {
                evento.preventDefault();
                enviarMensaje();
            }
        });
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: iniciarFormulariosDemo() | ROL: script de vista
     * =====================DETALLES=====================
     * QUÉ HACE: intercepta los formularios .form-demo y avisa que aún no hay
     *           backend, sin recargar la página ni perder lo escrito.
     * VINCULADO A: las vistas de Autenticacion/*.php con data-mensaje-demo.
     * SI SE ALTERA: cuando exista backend, quitar la clase .form-demo.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function iniciarFormulariosDemo() {
        var formularios = document.querySelectorAll('form.form-demo');
        var colorPrimario = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#FBB03B';

        Array.prototype.forEach.call(formularios, function (formulario) {
            formulario.addEventListener('submit', function (evento) {
                evento.preventDefault();

                var mensaje = formulario.getAttribute('data-mensaje-demo') || 'Esta función todavía no está disponible.';

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'info',
                        title: 'Disponible próximamente',
                        text: mensaje,
                        confirmButtonText: 'Entendido',
                        confirmButtonColor: colorPrimario
                    });
                } else {
                    window.alert(mensaje);
                }
            });
        });
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: iniciar() | ROL: punto de entrada
     * =====================DETALLES=====================
     * QUÉ HACE: arranca las tres interacciones cuando el DOM está listo.
     * VINCULADO A: la dispara el listener DOMContentLoaded de este archivo.
     * SI SE ALTERA: agregar acá cualquier interacción nueva del sitio.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function iniciar() {
        iniciarBotonVolverArriba();
        iniciarChat();
        iniciarFormulariosDemo();
    }

    document.addEventListener('DOMContentLoaded', iniciar);
})();
