/*====================ENCABEZADO====================
SCRIPT: mapa.js — mapa de rastreo y de contacto
ARCHIVO: Publico/Recursos/js/mapa.js
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: dibuja origen, destino y rider sobre Leaflet leyendo los data-* del
          contenedor; si falta Leaflet o el contenedor, no hace nada.
VINCULADO A: Vistas/Rastreo/ver.php y Vistas/Contacto/index.php, que definen los
          data-* y lo cargan por $extraJs; requiere leaflet.js de pieSitio.php.
SI SE ALTERA: si cambian los nombres de los data-*, actualizar ambas vistas.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

(function () {
    'use strict';

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: leerNumero() | ROL: helper
     * =====================DETALLES=====================
     * QUÉ HACE: convierte un data-* en número y devuelve null si no es válido.
     * VINCULADO A: la usa iniciarMapa() de este mismo archivo.
     * SI SE ALTERA: afecta el centrado y los marcadores del mapa.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function leerNumero(contenedor, atributo) {
        var valor = parseFloat(contenedor.getAttribute(atributo));
        return isNaN(valor) ? null : valor;
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: agregarMarcador() | ROL: helper
     * =====================DETALLES=====================
     * QUÉ HACE: coloca un marcador con etiqueta y devuelve su marcador.
     * VINCULADO A: la usa iniciarMapa() de este mismo archivo.
     * SI SE ALTERA: cambia la forma de señalar origen, destino y rider.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function agregarMarcador(mapa, latitud, longitud, nombre) {
        var marcador = L.marker([latitud, longitud]).addTo(mapa);
        if (nombre) {
            marcador.bindPopup(nombre);
        }
        return marcador;
    }

    /**
     * ====================ENCABEZADO====================
     * FUNCIÓN: iniciarMapa() | ROL: script de vista
     * =====================DETALLES=====================
     * QUÉ HACE: arma el mapa, une origen y destino con una línea y ajusta la vista.
     * VINCULADO A: la invoca el listener DOMContentLoaded de este archivo.
     * SI SE ALTERA: revisar los data-* de las dos vistas que la usan.
     * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
     * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
     * ==================================================
     */
    function iniciarMapa() {
        var contenedor = document.getElementById('mapa-rastreo') || document.getElementById('mapa-contacto');

        if (!contenedor || typeof L === 'undefined') {
            return;
        }

        var latitudCentro = leerNumero(contenedor, 'data-centro-lat');
        var longitudCentro = leerNumero(contenedor, 'data-centro-lng');

        if (latitudCentro === null || longitudCentro === null) {
            return;
        }

        var zoom = leerNumero(contenedor, 'data-zoom');
        var mapa = L.map(contenedor).setView([latitudCentro, longitudCentro], zoom === null ? 14 : zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(mapa);

        var origenLat = leerNumero(contenedor, 'data-origen-lat');
        var origenLng = leerNumero(contenedor, 'data-origen-lng');
        var destinoLat = leerNumero(contenedor, 'data-destino-lat');
        var destinoLng = leerNumero(contenedor, 'data-destino-lng');
        var riderLat = leerNumero(contenedor, 'data-rider-lat');
        var riderLng = leerNumero(contenedor, 'data-rider-lng');

        var puntos = [];

        if (origenLat !== null && origenLng !== null) {
            agregarMarcador(mapa, origenLat, origenLng, contenedor.getAttribute('data-origen-nombre'));
            puntos.push([origenLat, origenLng]);
        }

        if (destinoLat !== null && destinoLng !== null) {
            agregarMarcador(mapa, destinoLat, destinoLng, contenedor.getAttribute('data-destino-nombre'));
            puntos.push([destinoLat, destinoLng]);
        }

        if (riderLat !== null && riderLng !== null) {
            agregarMarcador(mapa, riderLat, riderLng, contenedor.getAttribute('data-rider-nombre'));
            puntos.push([riderLat, riderLng]);
        }

        if (puntos.length >= 2) {
            L.polyline(puntos, { color: '#FBB03B', weight: 3 }).addTo(mapa);
            mapa.fitBounds(L.latLngBounds(puntos), { padding: [30, 30] });
        }
    }

    document.addEventListener('DOMContentLoaded', iniciarMapa);
})();
