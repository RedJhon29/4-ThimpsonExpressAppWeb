<!DOCTYPE html>
<html lang="es-NI">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Thimpson Express - Servicio de delivery y express en Ocotal, Nicaragua">
    <title><?php echo $pageTitle ?? 'Thimpson Express'; ?> — Thimpson Express</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="<?php echo BASE_URL; ?>/Publico/Recursos/css/custom.css" rel="stylesheet">
</head>
<body>

<!-- Top Bar (Yellow) -->
<div class="top-bar d-none d-md-block">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <span class="me-4">
                    <i class="bi bi-telephone-fill me-1"></i>
                    Claro: <a href="tel:+50584159112"><?php echo APP_PHONE_CLARO; ?></a>
                </span>
                <span>
                    <i class="bi bi-telephone-fill me-1"></i>
                    Tigo: <a href="tel:+50585932295"><?php echo APP_PHONE_TIGO; ?></a>
                </span>
            </div>
            <div>
                <a href="https://wa.me/50584159112" target="_blank">
                    <i class="bi bi-whatsapp me-1"></i> WhatsApp
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Navbar (Dark) -->
<nav class="navbar navbar-expand-lg navbar-custom sticky-top">
    <div class="container">
        <a class="navbar-brand-custom" href="<?php echo BASE_URL; ?>/">
            <div class="navbar-brand-logo">T</div>
            <span class="navbar-brand-text">Thimpson Express</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'home' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'servicios' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/servicios">Servicios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'marketplace' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/marketplace">Marketplace</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'planes' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/planes">Planes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'rastrear' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/rastrear">Rastrear</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'nosotros' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/nosotros">Nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($activeMenu ?? '') === 'contacto' ? 'active' : ''; ?>" href="<?php echo BASE_URL; ?>/contacto">Contacto</a>
                </li>
            </ul>
            <div class="d-flex gap-2">
                <a href="<?php echo BASE_URL; ?>/login" class="btn btn-outline-light btn-sm">Suscribirse</a>
                <a href="<?php echo BASE_URL; ?>/servicios" class="btn btn-nav-primary btn-sm">Solicitar Servicio</a>
            </div>
        </div>
    </div>
</nav>
