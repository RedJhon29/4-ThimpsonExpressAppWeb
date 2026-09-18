<?php
/**
 * Modelo: Calificaciones y Reseñas
 */
class Rating {

    private static $ratings = [
        ['id' => 1, 'rider_id' => 1, 'order_id' => 'TEX-2026-0801', 'rating' => 5, 'comment' => 'Excelente servicio, muy rápido.', 'tags' => ['Servicio rápido', 'Rider amable'], 'date' => '2026-09-15', 'client' => 'Carlos M.'],
        ['id' => 2, 'rider_id' => 1, 'order_id' => 'TEX-2026-0798', 'rating' => 5, 'comment' => 'Muy profesional.', 'tags' => ['Rider amable'], 'date' => '2026-09-14', 'client' => 'Ana R.'],
        ['id' => 3, 'rider_id' => 2, 'order_id' => 'TEX-2026-0795', 'rating' => 4, 'comment' => 'Buen servicio, tardó un poco.', 'tags' => ['Servicio rápido'], 'date' => '2026-09-13', 'client' => 'Pedro L.'],
        ['id' => 4, 'rider_id' => 1, 'order_id' => 'TEX-2026-0790', 'rating' => 5, 'comment' => 'Perfecto, llegó antes del tiempo.', 'tags' => ['Servicio rápido', 'Producto bien empacado'], 'date' => '2026-09-12', 'client' => 'Laura S.'],
        ['id' => 5, 'rider_id' => 2, 'order_id' => 'TEX-2026-0785', 'rating' => 5, 'comment' => 'Muy buen servicio.', 'tags' => ['Rider amable'], 'date' => '2026-09-11', 'client' => 'Miguel A.'],
        ['id' => 6, 'rider_id' => 1, 'order_id' => 'TEX-2026-0780', 'rating' => 3, 'comment' => 'El producto llegó dañado.', 'tags' => ['Producto dañado'], 'date' => '2026-09-10', 'client' => 'Sofia P.', 'reported' => true],
        ['id' => 7, 'rider_id' => 2, 'order_id' => 'TEX-2026-0775', 'rating' => 5, 'comment' => 'Recomendado.', 'tags' => ['Servicio rápido', 'Rider amable'], 'date' => '2026-09-09', 'client' => 'Roberto C.'],
        ['id' => 8, 'rider_id' => 1, 'order_id' => 'TEX-2026-0770', 'rating' => 4, 'comment' => 'Todo bien, un poco lento.', 'tags' => [], 'date' => '2026-09-08', 'client' => 'Diana V.'],
        ['id' => 9, 'rider_id' => 2, 'order_id' => 'TEX-2026-0765', 'rating' => 2, 'comment' => 'No llegó a tiempo.', 'tags' => ['Servicio malo', 'Llegó tarde'], 'date' => '2026-09-07', 'client' => 'Jorge F.', 'reported' => true],
        ['id' => 10, 'rider_id' => 1, 'order_id' => 'TEX-2026-0760', 'rating' => 1, 'comment' => 'Pesimo servicio.', 'tags' => ['Servicio malo'], 'date' => '2026-09-06', 'client' => 'Elena G.', 'reported' => true],
    ];

    private static $testimonials = [
        ['name' => 'Carlos Martínez', 'role' => 'Empresario', 'text' => 'Thimpson Express transformó la logística de mi negocio. Entregas rápidas y confiables.', 'rating' => 5, 'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'],
        ['name' => 'Ana Rodríguez', 'role' => 'Restaurante', 'text' => 'Mis clientes reciben sus pedidos a tiempo. Excelente servicio.', 'rating' => 5, 'avatar' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'],
        ['name' => 'Pedro López', 'role' => 'Tienda Online', 'text' => 'La mejor opción para delivery en Ocotal. Precios justos y servicio confiable.', 'rating' => 5, 'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'],
    ];

    private static $gallery = [
        ['id' => 1, 'url' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600', 'title' => 'Entrega realizada', 'category' => 'entregas'],
        ['id' => 2, 'url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', 'title' => 'Nuestro equipo', 'category' => 'equipo'],
        ['id' => 3, 'url' => 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600', 'title' => 'Vehículos', 'category' => 'vehiculos'],
        ['id' => 4, 'url' => 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600', 'title' => 'Atención al cliente', 'category' => 'servicio'],
        ['id' => 5, 'url' => 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600', 'title' => 'Sede principal', 'category' => 'oficina'],
    ];

    public static function all() {
        return self::$ratings;
    }

    public static function average() {
        if (empty(self::$ratings)) return 0;
        $sum = array_sum(array_column(self::$ratings, 'rating'));
        return round($sum / count(self::$ratings), 1);
    }

    public static function breakdown() {
        $breakdown = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
        foreach (self::$ratings as $r) {
            $breakdown[$r['rating']]++;
        }
        return $breakdown;
    }

    public static function getTestimonials() {
        return self::$testimonials;
    }

    public static function getGallery() {
        return self::$gallery;
    }
}
