<?php
/**
 * Modelo: Planes de Suscripción
 */
class Plan {

    private static $plans = [
        [
            'id' => 'free',
            'name' => 'Gratis',
            'price_monthly' => 0,
            'price_yearly' => 0,
            'deliveries_month' => 10,
            'popular' => false,
            'features' => [
                'Chat con riders' => true,
                'Rastreo básico' => true,
                'ETA estimado' => false,
                'Precios corporativos' => false,
                'Reportes mensuales' => false,
                'Rider dedicado' => false,
                'Soporte prioritario' => false,
            ],
        ],
        [
            'id' => 'pro',
            'name' => 'Pro',
            'price_monthly' => 25,
            'price_yearly' => 240,
            'deliveries_month' => 200,
            'popular' => true,
            'features' => [
                'Chat con riders' => true,
                'Rastreo básico' => true,
                'ETA estimado' => true,
                'Precios corporativos' => true,
                'Reportes mensuales' => true,
                'Rider dedicado' => false,
                'Soporte prioritario' => false,
            ],
        ],
        [
            'id' => 'empresarial',
            'name' => 'Empresarial',
            'price_monthly' => 65,
            'price_yearly' => 624,
            'deliveries_month' => -1, // -1 = ilimitado
            'popular' => false,
            'features' => [
                'Chat con riders' => true,
                'Rastreo básico' => true,
                'ETA estimado' => true,
                'Precios corporativos' => true,
                'Reportes mensuales' => true,
                'Rider dedicado' => true,
                'Soporte prioritario' => true,
            ],
        ],
    ];

    public static function all() {
        return self::$plans;
    }

    public static function find($id) {
        foreach (self::$plans as $plan) {
            if ($plan['id'] === $id) {
                return $plan;
            }
        }
        return null;
    }

    public static function getPopular() {
        foreach (self::$plans as $plan) {
            if ($plan['popular']) {
                return $plan;
            }
        }
        return null;
    }
}
