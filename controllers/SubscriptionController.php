<?php
/**
 * Controlador: Suscripciones y Planes
 */
class SubscriptionController {

    public function plans() {
        $pageTitle = 'Planes';
        $activeMenu = 'planes';
        $plans = Plan::all();

        include VIEW_PATH . '/subscriptions/plans.php';
    }

    public function checkout($planId) {
        $plan = Plan::find($planId);

        if (!$plan) {
            http_response_code(404);
            $pageTitle = '404 - No encontrado';
            include VIEW_PATH . '/layouts/site-header.php';
            include VIEW_PATH . '/errors/404.php';
            include VIEW_PATH . '/layouts/site-footer.php';
            return;
        }

        $pageTitle = 'Checkout - ' . $plan['name'];
        $activeMenu = 'planes';

        include VIEW_PATH . '/subscriptions/checkout.php';
    }

    public function billing() {
        $pageTitle = 'Facturación';
        $activeMenu = 'cuenta';
        $subscription = Subscription::getCurrent();
        $invoices = Billing::getInvoices();
        $paymentMethods = Billing::getPaymentMethods();

        include VIEW_PATH . '/subscriptions/billing.php';
    }
}
