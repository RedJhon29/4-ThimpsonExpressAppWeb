<?php
/**
 * Modelo: Pedidos (para rastreo)
 */
class Pedido {

    private static $orders = [
        [
            'id' => 'TEX-2026-0847',
            'status' => 'IN_TRANSIT',
            'status_label' => 'En Camino',
            'origin' => ['lat' => 13.6324, 'lng' => -86.4764, 'name' => 'Ocotal Centro'],
            'destination' => ['lat' => 13.6564, 'lng' => -86.4964, 'name' => 'Barrio San José'],
            'rider' => [
                'id' => 1,
                'name' => 'María Torres',
                'vehicle' => 'Moto Yamaha FZ',
                'rating' => 4.9,
                'phone' => '+505 8800 1111',
                'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                'current_lat' => 13.6424,
                'current_lng' => -86.4864,
            ],
            'distance' => 4.8,
            'cost' => 120,
            'created_at' => '2026-09-18 14:30:00',
            'steps' => [
                ['label' => 'Solicitado', 'completed' => true, 'time' => '14:30'],
                ['label' => 'Asignado', 'completed' => true, 'time' => '14:32'],
                ['label' => 'En Camino', 'completed' => true, 'time' => '14:35'],
                ['label' => 'Entregado', 'completed' => false, 'time' => null],
            ],
        ],
        [
            'id' => 'TEX-2026-0851',
            'status' => 'PICKED_UP',
            'status_label' => 'Recolectado',
            'origin' => ['lat' => 13.6324, 'lng' => -86.4764, 'name' => 'Farmacia Central'],
            'destination' => ['lat' => 13.6724, 'lng' => -86.5164, 'name' => 'Residencial Los Pinos'],
            'rider' => [
                'id' => 2,
                'name' => 'Luis Gómez',
                'vehicle' => 'Moto Honda Wave',
                'rating' => 4.8,
                'phone' => '+505 8800 2222',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                'current_lat' => 13.6324,
                'current_lng' => -86.4764,
            ],
            'distance' => 6.7,
            'cost' => 185,
            'created_at' => '2026-09-18 13:15:00',
            'steps' => [
                ['label' => 'Solicitado', 'completed' => true, 'time' => '13:15'],
                ['label' => 'Asignado', 'completed' => true, 'time' => '13:17'],
                ['label' => 'En Camino', 'completed' => false, 'time' => null],
                ['label' => 'Entregado', 'completed' => false, 'time' => null],
            ],
        ],
        [
            'id' => 'TEX-2026-0849',
            'status' => 'PENDING',
            'status_label' => 'Pendiente',
            'origin' => ['lat' => 13.6324, 'lng' => -86.4764, 'name' => 'Supermercado Central'],
            'destination' => ['lat' => 13.6424, 'lng' => -86.4864, 'name' => 'Colonia Libertad'],
            'rider' => null,
            'distance' => 2.8,
            'cost' => 65,
            'created_at' => '2026-09-18 15:00:00',
            'steps' => [
                ['label' => 'Solicitado', 'completed' => true, 'time' => '15:00'],
                ['label' => 'Asignado', 'completed' => false, 'time' => null],
                ['label' => 'En Camino', 'completed' => false, 'time' => null],
                ['label' => 'Entregado', 'completed' => false, 'time' => null],
            ],
        ],
    ];

    public static function all() {
        return self::$orders;
    }

    public static function findById($id) {
        foreach (self::$orders as $order) {
            if ($order['id'] === $id) {
                return $order;
            }
        }
        return null;
    }

    public static function statusCounts() {
        $counts = ['PENDING' => 0, 'PICKED_UP' => 0, 'IN_TRANSIT' => 0, 'DELIVERED' => 0];
        foreach (self::$orders as $order) {
            $counts[$order['status']] = ($counts[$order['status']] ?? 0) + 1;
        }
        return $counts;
    }
}
