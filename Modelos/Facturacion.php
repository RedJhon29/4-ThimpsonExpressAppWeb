<?php
/**
 * Modelo: Facturación
 */
class Facturacion {

    private static $invoices = [
        ['id' => 'INV-2026-001', 'date' => '2026-09-01', 'amount' => 240, 'status' => 'Pagada', 'plan' => 'Pro Anual'],
        ['id' => 'INV-2026-002', 'date' => '2026-08-01', 'amount' => 240, 'status' => 'Pagada', 'plan' => 'Pro Anual'],
        ['id' => 'INV-2026-003', 'date' => '2026-07-01', 'amount' => 240, 'status' => 'Pagada', 'plan' => 'Pro Anual'],
        ['id' => 'INV-2026-004', 'date' => '2026-06-01', 'amount' => 240, 'status' => 'Pendiente', 'plan' => 'Pro Anual'],
    ];

    private static $paymentMethods = [
        ['id' => 1, 'type' => 'card', 'brand' => 'Visa', 'last4' => '4242', 'expiry' => '12/28', 'default' => true],
        ['id' => 2, 'type' => 'transfer', 'bank' => 'BAC Credomatic', 'account' => '****7890', 'default' => false],
        ['id' => 3, 'type' => 'wallet', 'provider' => 'Tigo Money', 'phone' => '*844#', 'default' => false],
    ];

    public static function getInvoices() {
        return self::$invoices;
    }

    public static function getPaymentMethods() {
        return self::$paymentMethods;
    }
}
