/**
 * App JS — Thimpson Express
 * Funciones globales: BackToTop, Chat, WhatsApp, etc.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // Chat Widget
    // ==========================================
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', function () {
            chatWidget.classList.toggle('active');
            if (chatWidget.classList.contains('active')) {
                chatInput.focus();
            }
        });

        if (chatClose) {
            chatClose.addEventListener('click', function () {
                chatWidget.classList.remove('active');
            });
        }

        // Send message
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            appendMessage('user', message);
            chatInput.value = '';

            // Process and respond
            setTimeout(function () {
                const response = processChatMessage(message);
                appendMessage('bot', response);
            }, 500);
        }

        if (chatSend) {
            chatSend.addEventListener('click', sendChatMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
    }

    function appendMessage(type, text) {
        if (!chatBody) return;
        const div = document.createElement('div');
        div.className = 'chat-message ' + type;
        div.innerHTML = '<div class="chat-bubble ' + type + '">' + text + '</div>';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processChatMessage(message) {
        const lower = message.toLowerCase();

        // Saludos
        if (lower.match(/^(hola|buenos dias|buenas tardes|buenas noches|hey)/)) {
            return '¡Hola! ¿En qué puedo ayudarte? Puedo darte información sobre nuestros servicios, precios o ayudarte a rastrear un pedido.';
        }

        // Precios
        if (lower.includes('precio') || lower.includes('cuanto cuesta') || lower.includes('costo')) {
            return 'Nuestros servicios de mandado y delivery tienen un precio base de <strong>C$40 por parada</strong>. Para encomiendas y transportes, el precio depende de la distancia. ¿Qué servicio te interesa?';
        }

        // Servicios
        if (lower.includes('mandado')) {
            return 'El servicio de <strong>Mandado</strong> cuesta <strong>C$40 por parada</strong>. Cubrimos Ocotal y Zona Norte. ¿Necesitás hacer un pedido?';
        }
        if (lower.includes('delivery')) {
            return 'El servicio de <strong>Delivery</strong> cuesta <strong>C$40 por parada</strong>. Entregamos en 30-45 minutos. ¿Querés hacer un pedido?';
        }
        if (lower.includes('encomienda')) {
            return 'El servicio de <strong>Encomienda</strong> cuesta <strong>C$40 por parada</strong>. Cubrimos Ocotal, Norte, Central y Pacífico. ¿Necesitás enviar un paquete?';
        }
        if (lower.includes('mudanza')) {
            return 'El servicio de <strong>Mudanza</strong> incluye embalaje profesional, transporte seguro y desarme/armaje. El precio se cotiza según la volumetría. ¿Querés solicitar una cotización?';
        }

        // Rastreo
        if (lower.includes('rastrear') || lower.includes('pedido') || lower.includes('seguimiento')) {
            return 'Para rastrear tu pedido, visitá nuestra página de <a href="<?php echo BASE_URL; ?>/rastrear">rastreo</a> o escribí el código de tu pedido (ej: TEX-2026-0847).';
        }

        // Municipios
        if (lower.includes('ocotal') || lower.includes('esteli') || lower.includes('jinotega') || lower.includes('managua')) {
            return 'Sí, cubrimos esa zona. El precio puede variar según la ubicación. ¿Querés que te dé el precio exacto para tu ruta?';
        }

        // Contacto
        if (lower.includes('contacto') || lower.includes('telefono') || lower.includes('whatsapp')) {
            return 'Podés contactarnos al:<br>📱 Claro: <strong>+505 8415 9112</strong><br>📱 Tigo: <strong>+505 8593 2295</strong><br>💬 WhatsApp: <strong>+505 8415 9112</strong>';
        }

        // Agradecimientos
        if (lower.match(/(gracias|thank you|agradecido)/)) {
            return '¡De nada! Si necesitás algo más, estoy aquí para ayudarte. 😊';
        }

        // Default
        return 'No estoy seguro de entender tu consulta. Puedo ayudarte con:<br>• Información de <strong>servicios y precios</strong><br>• <strong>Rastreo</strong> de pedidos<br>• <strong>Datos de contacto</strong><br>¿Qué necesitás?';
    }

    // ==========================================
    // Select2 Initialization
    // ==========================================
    if (typeof $.fn.select2 !== 'undefined') {
        $('.select2').select2({
            theme: 'bootstrap-5',
            width: '100%'
        });
    }

    // ==========================================
    // DataTables Initialization
    // ==========================================
    if (typeof $.fn.DataTable !== 'undefined') {
        $('.datatable').DataTable({
            language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: {
                    previous: "Anterior",
                    next: "Siguiente"
                },
                zeroRecords: "No se encontraron resultados"
            }
        });
    }

    // ==========================================
    // SweetAlert helpers
    // ==========================================
    window.showToast = function (type, title, text) {
        Swal.fire({
            icon: type,
            title: title,
            text: text,
            timer: 3000,
            showConfirmButton: false
        });
    };

    window.showConfirm = function (title, text, callback) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FBB03B',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    };

});
