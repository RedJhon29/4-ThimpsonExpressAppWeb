<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4">
                <h5>
                    <span style="color: var(--primary);">Servicio Express</span> Thimpson
                </h5>
                <p>Soluciones de delivery y express en Ocotal, Nueva Segovia, Nicaragua. Rápido, confiable y seguro.</p>
                <div class="d-flex gap-2">
                    <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', APP_WHATSAPP); ?>" target="_blank" class="btn btn-sm" style="background-color: var(--whatsapp); color: white;">
                        <i class="bi bi-whatsapp"></i>
                    </a>
                    <a href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Servicios</h5>
                <ul class="list-unstyled">
                    <li><a href="<?php echo BASE_URL; ?>/servicios">Mandados</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/servicios">Delivery</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/servicios">Encomiendas</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/servicios">Mudanzas</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Empresa</h5>
                <ul class="list-unstyled">
                    <li><a href="<?php echo BASE_URL; ?>/nosotros">Nosotros</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/marketplace">Marketplace</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/contacto">Contacto</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/galeria">Galería</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Soporte</h5>
                <ul class="list-unstyled">
                    <li><a href="<?php echo BASE_URL; ?>/planes">Planes</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/rastrear">Rastrear Pedido</a></li>
                    <li><a href="<?php echo BASE_URL; ?>/recuperar">Recuperar Contraseña</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Contacto</h5>
                <ul class="list-unstyled">
                    <li><i class="bi bi-telephone me-2"></i><?php echo APP_PHONE_CLARO; ?></li>
                    <li><i class="bi bi-telephone me-2"></i><?php echo APP_PHONE_TIGO; ?></li>
                    <li><i class="bi bi-geo-alt me-2"></i><?php echo APP_LOCATION; ?></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom text-center">
            <p class="mb-0">&copy; <?php echo date('Y'); ?> <?php echo APP_NAME; ?>. Todos los derechos reservados.</p>
        </div>
    </div>
</footer>

<!-- Floating Buttons (cuadrados) -->
<a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', APP_WHATSAPP); ?>" target="_blank" class="float-btn float-btn-whatsapp" title="WhatsApp">
    <i class="bi bi-whatsapp"></i>
</a>

<button class="float-btn float-btn-back-to-top" id="backToTop" title="Volver arriba">
    <i class="bi bi-arrow-up"></i>
</button>

<button class="float-btn float-btn-chat" id="chatToggle" title="Chat">
    <i class="bi bi-chat-dots"></i>
</button>

<!-- Chat Widget -->
<div class="chat-widget" id="chatWidget">
    <div class="chat-header d-flex justify-content-between align-items-center">
        <span><i class="bi bi-robot me-2"></i>Thimpson Assistant</span>
        <button class="btn btn-sm btn-link text-white p-0" id="chatClose"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="chat-body" id="chatBody">
        <div class="chat-message bot">
            <div class="chat-bubble bot">¡Hola! Soy el asistente de Thimpson Express. ¿En qué puedo ayudarte?</div>
        </div>
    </div>
    <div class="chat-input-area">
        <input type="text" class="form-control" id="chatInput" placeholder="Escribí tu mensaje..." autocomplete="off">
        <button class="btn btn-primary-custom" id="chatSend"><i class="bi bi-send"></i></button>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Select2 JS -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Alertify -->
<script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

<!-- App JS -->
<script src="<?php echo BASE_URL; ?>/Publico/Recursos/js/app.js"></script>

<?php $extraJs = $extraJs ?? []; ?>
<?php if (!empty($extraJs)): ?>
    <?php foreach ($extraJs as $js): ?>
        <script src="<?php echo $js; ?>"></script>
    <?php endforeach; ?>
<?php endif; ?>

</body>
</html>
