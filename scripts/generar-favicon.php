<?php
/*====================ENCABEZADO====================
SCRIPT: generar-favicon | ROL: scripts (PHP + GD)
ARCHIVO: scripts/generar-favicon.php
==================================================*/

/*=====================DETALLES=====================
QUÉ HACE: genera Publico/Recursos/img/favicon.ico con la T de Thimpson Express
          en 16, 32 y 48 px, envueltos como PNG dentro del contenedor ICO.
VINCULADO A: replica la rejilla 64 de Publico/Recursos/img/favicon.svg; lo
          consumen los <link rel="icon"> de Plantillas/encabezadoSitio.php.
SI SE ALTERA: si cambia la geometría de la T hay que repetirla en favicon.svg.
FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
==================================================*/

/*================CUERPO DEL CÓDIGO=================*/

/* Rejilla de referencia (64 px): la T vive entre x=12..52, y=15..49.
   Barra horizontal arriba + vástago centrado. */
define('REJILLA', 64);
define('BARRA_X', 12);
define('BARRA_ANCHO', 40);
define('BARRA_Y', 15);
define('BARRA_ALTO', 10);
define('VASTAGO_X', 27);
define('VASTAGO_ANCHO', 10);
define('VASTAGO_ALTO', 24);

define('DESTINO', __DIR__ . '/../Publico/Recursos/img/favicon.ico');

/**
 * ====================ENCABEZADO====================
 * FUNCIÓN: pintarTamano() | ROL: script (GD)
 * ==================================================
 * =====================DETALLES=====================
 * QUÉ HACE: dibuja la T sobre un lienzo cuadrado del tamaño pedido, escalando
 *           la rejilla 64, y devuelve los bytes PNG en memoria.
 * VINCULADO A: la llama el bucle de $tamanos al final del script; replica la
 *           geometría de Publico/Recursos/img/favicon.svg.
 * SI SE ALTERA: cambia el .ico de 16/32/48 px; repetir la geometría en el SVG.
 * FECHA: 2026-11-11 | LUGAR: Ocotal, Nueva Segovia
 * ESCRITO POR: ING. DENIS MANUEL LÓPEZ MOLINA.
 * ==================================================
 */
function pintarTamano(int $tamano): string
{
    $imagen = imagecreatetruecolor($tamano, $tamano);
    $ambar = imagecolorallocate($imagen, 0xFB, 0xB0, 0x3B);
    $negro = imagecolorallocate($imagen, 0x00, 0x00, 0x00);
    imagefill($imagen, 0, 0, $ambar);

    $escala = $tamano / REJILLA;
    $barraX = (int) round(BARRA_X * $escala);
    $barraY = (int) round(BARRA_Y * $escala);
    $barraAncho = max(1, (int) round(BARRA_ANCHO * $escala));
    $barraAlto = max(1, (int) round(BARRA_ALTO * $escala));
    $vastagoX = (int) round(VASTAGO_X * $escala);
    $vastagoAncho = max(1, (int) round(VASTAGO_ANCHO * $escala));
    $vastagoAlto = max(1, (int) round(VASTAGO_ALTO * $escala));

    imagefilledrectangle(
        $imagen,
        $barraX,
        $barraY,
        $barraX + $barraAncho - 1,
        $barraY + $barraAlto - 1,
        $negro
    );
    imagefilledrectangle(
        $imagen,
        $vastagoX,
        $barraY + $barraAlto,
        $vastagoX + $vastagoAncho - 1,
        $barraY + $barraAlto + $vastagoAlto - 1,
        $negro
    );

    ob_start();
    imagepng($imagen);
    $png = (string) ob_get_clean();
    imagedestroy($imagen);

    return $png;
}

$tamanos = [16, 32, 48];
$pngs = [];
foreach ($tamanos as $tamano) {
    $pngs[$tamano] = pintarTamano($tamano);
}

/* Contenedor ICO: cabecera de 6 bytes + una entrada de 16 bytes por tamaño +
   los PNG concatenados. Los navegadores modernos aceptan PNG dentro del ICO. */
$entradas = '';
$datos = '';
$desplazamiento = 6 + 16 * count($pngs);
foreach ($pngs as $tamano => $png) {
    $entradas .= pack(
        'CCCCvvVV',
        $tamano >= 256 ? 0 : $tamano,
        $tamano >= 256 ? 0 : $tamano,
        0,
        0,
        1,
        32,
        strlen($png),
        $desplazamiento
    );
    $datos .= $png;
    $desplazamiento += strlen($png);
}

$ico = pack('v3', 0, 1, count($pngs)) . $entradas . $datos;
$escritos = file_put_contents(DESTINO, $ico);
if ($escritos === false) {
    fwrite(STDERR, "ERROR: no se pudo escribir " . DESTINO . PHP_EOL);
    exit(1);
}

echo 'Generado ' . DESTINO . ' (' . $escritos . ' bytes)' . PHP_EOL;

/* Autoverificación: relee el ICO, confirma la cabecera y muestrea píxeles del
   PNG de 32 px (esquina ámbar, barra y vástago negros). */
$leido = file_get_contents(DESTINO);
$cabecera = unpack('vreservado/vtipo/vcantidad', substr($leido, 0, 6));
if ($cabecera === false || $cabecera['tipo'] !== 1 || $cabecera['cantidad'] !== count($pngs)) {
    fwrite(STDERR, 'ERROR: cabecera ICO inválida.' . PHP_EOL);
    exit(1);
}

$verificar = imagecreatefromstring($pngs[32]);
if ($verificar === false) {
    fwrite(STDERR, 'ERROR: el PNG de 32 px no se pudo releer.' . PHP_EOL);
    exit(1);
}
$pruebas = [
    'esquina ámbar' => [imagecolorat($verificar, 1, 1), 0xFBB03B],
    'barra negra' => [imagecolorat($verificar, 16, 10), 0x000000],
    'vástago negro' => [imagecolorat($verificar, 16, 20), 0x000000],
];
foreach ($pruebas as $nombre => [$color, $esperado]) {
    if ($color !== $esperado) {
        fwrite(STDERR, "ERROR: $nombre devolvió " . dechex($color) . ', esperaba ' . dechex($esperado) . PHP_EOL);
        exit(1);
    }
    echo "VERIFICACIÓN: $nombre OK" . PHP_EOL;
}
echo 'VERIFICACIÓN: ICO con ' . $cabecera['cantidad'] . ' tamaños correcto.' . PHP_EOL;
