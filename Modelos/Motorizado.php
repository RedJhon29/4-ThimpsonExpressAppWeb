<?php
/**
 * Modelo: Riders
 */
class Motorizado {

    private static $riders = [
        [
            'id' => 1,
            'name' => 'María Torres',
            'phone' => '+505 8800 1111',
            'vehicle' => 'Moto Yamaha FZ',
            'vehicle_plate' => 'M-12345',
            'rating' => 4.9,
            'total_deliveries' => 342,
            'status' => 'active',
            'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            'current_lat' => 13.6424,
            'current_lng' => -86.4864,
        ],
        [
            'id' => 2,
            'name' => 'Luis Gómez',
            'phone' => '+505 8800 2222',
            'vehicle' => 'Moto Honda Wave',
            'vehicle_plate' => 'M-67890',
            'rating' => 4.8,
            'total_deliveries' => 218,
            'status' => 'active',
            'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            'current_lat' => 13.6324,
            'current_lng' => -86.4764,
        ],
    ];

    public static function all() {
        return self::$riders;
    }

    public static function find($id) {
        foreach (self::$riders as $rider) {
            if ($rider['id'] == $id) {
                return $rider;
            }
        }
        return null;
    }
}
