<?php
/**
 * Modelo: Servicios
 */
class Service {

    private static $services = [
        [
            'id' => 1,
            'name' => 'Mandado',
            'slug' => 'mandado',
            'description' => 'Recogemos y entregamos productos en tu zona.',
            'icon' => 'shopping-bag',
            'price_type' => 'fixed',
            'price_base' => 40,
            'price_label' => 'C$40/parada',
            'coverage' => ['Ocotal', 'Zona Norte'],
            'features' => ['Recogida en punto indicado', 'Entrega en tu puerta', 'Seguimiento en tiempo real', 'Pago contra entrega'],
        ],
        [
            'id' => 2,
            'name' => 'Delivery',
            'slug' => 'delivery',
            'description' => 'Entrega rápida de alimentos y productos.',
            'icon' => 'truck',
            'price_type' => 'fixed',
            'price_base' => 40,
            'price_label' => 'C$40/parada',
            'coverage' => ['Ocotal', 'Zona Norte'],
            'features' => ['Entrega en 30-45 min', 'Restaurantes afiliados', 'Temperatura controlada', 'Seguimiento en vivo'],
        ],
        [
            'id' => 3,
            'name' => 'Encomienda',
            'slug' => 'encomienda',
            'description' => 'Envíos de paquetes entre ciudades.',
            'icon' => 'package',
            'price_type' => 'fixed',
            'price_base' => 40,
            'price_label' => 'C$40/parada',
            'coverage' => ['Ocotal', 'Norte', 'Central', 'Pacífico'],
            'features' => ['Envío interurbano', 'Seguimiento completo', 'Seguro incluido', 'Entrega en 24-48h'],
        ],
        [
            'id' => 4,
            'name' => 'Viaje Expreso',
            'slug' => 'viaje-expreso',
            'description' => 'Transporte de pasajeros rápido y seguro.',
            'icon' => 'car',
            'price_type' => 'quote',
            'price_base' => 0,
            'price_label' => 'Cotizar',
            'coverage' => ['Norte', 'Central', 'Pacífico'],
            'features' => ['Puerta a puerta', 'Conductor verificado', 'Viaje seguro', 'Pago flexible'],
        ],
        [
            'id' => 5,
            'name' => 'Transporte',
            'slug' => 'transporte',
            'description' => 'Transporte de carga pesada y liviana.',
            'icon' => 'container',
            'price_type' => 'quote',
            'price_base' => 0,
            'price_label' => 'Cotizar',
            'coverage' => ['Todo el país'],
            'features' => ['Carga pesada y liviana', 'Flotilla diversa', 'Cobertura nacional', 'Seguro de carga'],
        ],
        [
            'id' => 6,
            'name' => 'Acarreo',
            'slug' => 'acarreo',
            'description' => 'Servicio de acarreo de vehículos.',
            'icon' => 'car',
            'price_type' => 'quote',
            'price_base' => 0,
            'price_label' => 'Cotizar',
            'coverage' => ['Todo el país'],
            'features' => ['Grúa equipada', 'Cobertura nacional', 'Emergencias 24/7', 'Seguro incluido'],
        ],
        [
            'id' => 7,
            'name' => 'Mudanza',
            'slug' => 'mudanza',
            'description' => 'Servicio de mudanza residencial y comercial.',
            'icon' => 'home',
            'price_type' => 'quote',
            'price_base' => 0,
            'price_label' => 'Cotizar',
            'coverage' => ['Todo el país'],
            'features' => ['Embalaje profesional', 'Transporte seguro', 'Desarme y armaje', 'Cobertura nacional'],
        ],
    ];

    public static function all() {
        return self::$services;
    }

    public static function find($id) {
        foreach (self::$services as $service) {
            if ($service['id'] == $id) {
                return $service;
            }
        }
        return null;
    }

    public static function findBySlug($slug) {
        foreach (self::$services as $service) {
            if ($service['slug'] === $slug) {
                return $service;
            }
        }
        return null;
    }

    public static function getMunicipalities() {
        return [
            ['value' => 'ocotal', 'label' => 'Ocotal', 'multiplier' => 1.0],
            ['value' => 'esteli', 'label' => 'Estelí', 'multiplier' => 1.6],
            ['value' => 'jinotega', 'label' => 'Jinotega', 'multiplier' => 1.8],
            ['value' => 'madriz', 'label' => 'Madriz', 'multiplier' => 1.5],
            ['value' => 'somoto', 'label' => 'Somoto', 'multiplier' => 1.5],
            ['value' => 'leon', 'label' => 'León', 'multiplier' => 1.4],
            ['value' => 'managua', 'label' => 'Managua', 'multiplier' => 1.4],
            ['value' => 'matagalpa', 'label' => 'Matagalpa', 'multiplier' => 1.4],
        ];
    }

    public static function calculateQuotePrice($basePrice, $municipalityMultiplier, $hours = 0) {
        $total = ($basePrice * $municipalityMultiplier) + ($hours * 150);
        return $total;
    }

    public static function calculateFixedPrice($stops, $contentCost = 0) {
        return ($stops * 40) + $contentCost;
    }
}
