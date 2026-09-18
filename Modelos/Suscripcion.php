<?php
/**
 * Modelo: Suscripción actual (mock)
 */
class Suscripcion {

    private static $current = [
        'plan' => 'pro',
        'plan_name' => 'Pro',
        'cycle' => 'yearly',
        'deliveries_used' => 87,
        'deliveries_limit' => 200,
        'renewal_date' => '2026-10-01',
        'status' => 'active',
    ];

    public static function getCurrent() {
        return self::$current;
    }
}
