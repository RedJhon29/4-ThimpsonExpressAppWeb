<?php
/**
 * Modelo: Negocios del Marketplace
 */
class Negocio {

    private static $businesses = [
        [
            'id' => 1,
            'name' => 'Sabor Criollo',
            'slug' => 'sabor-criollo',
            'category' => 'Comida',
            'category_slug' => 'comida',
            'description' => 'Restaurante de comida tradicional nicaragüense con los mejores sabores del norte.',
            'mission' => 'Llevar los sabores auténticos de Nica a cada mesa.',
            'vision' => 'Ser el restaurante referente de la gastronomía norteña.',
            'rating' => 4.8,
            'reviews_count' => 132,
            'plan' => 'premium',
            'phone' => '+505 8888 1234',
            'address' => 'Principal, Ocotal',
            'cover_image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
            'logo' => 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=200',
            'products' => [
                ['name' => 'Indio Viejo', 'price' => 85, 'stock' => true],
                ['name' => 'Baho', 'price' => 95, 'stock' => true],
                ['name' => 'Nacatamal', 'price' => 120, 'stock' => false],
                ['name' => 'Tajadas con Queso', 'price' => 75, 'stock' => true],
            ],
            'services' => ['Delivery', 'Mandado'],
        ],
        [
            'id' => 2,
            'name' => 'Farmacia Divina Providencia',
            'slug' => 'farmacia-divina-providencia',
            'category' => 'Farmacias',
            'category_slug' => 'farmacias',
            'description' => 'Farmacia con medicamentos, higiene y productos de cuidado personal.',
            'mission' => 'Salud y bienestar accesible para todos.',
            'vision' => 'Ser la farmacia más confiable de la región.',
            'rating' => 4.9,
            'reviews_count' => 87,
            'plan' => 'premium',
            'phone' => '+505 8888 5678',
            'address' => 'Comercial, Ocotal',
            'cover_image' => 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800',
            'logo' => 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200',
            'products' => [
                ['name' => 'Paracetamol 500mg', 'price' => 35, 'stock' => true],
                ['name' => 'Ibuprofeno 400mg', 'price' => 45, 'stock' => true],
                ['name' => 'Vitamina C', 'price' => 65, 'stock' => true],
                ['name' => 'Alcohol Gel', 'price' => 55, 'stock' => true],
            ],
            'services' => ['Delivery', 'Encomienda'],
        ],
        [
            'id' => 3,
            'name' => 'Supermercado Central',
            'slug' => 'supermercado-central',
            'category' => 'Supermercados',
            'category_slug' => 'supermercados',
            'description' => 'Supermercado con productos básicos, frutas, verduras y más.',
            'mission' => 'Ofrecer productos de calidad a precios accesibles.',
            'vision' => 'Ser el supermercado preferido de la comunidad.',
            'rating' => 4.6,
            'reviews_count' => 210,
            'plan' => 'free',
            'phone' => '+505 8888 9012',
            'address' => 'Central, Ocotal',
            'cover_image' => 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800',
            'logo' => 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
            'products' => [
                ['name' => 'Arroz 1lb', 'price' => 25, 'stock' => true],
                ['name' => 'Frijol 1lb', 'price' => 35, 'stock' => true],
                ['name' => 'Aceite 1L', 'price' => 65, 'stock' => true],
                ['name' => 'Azúcar 1lb', 'price' => 28, 'stock' => false],
            ],
            'services' => ['Mandado'],
        ],
    ];

    public static function all() {
        return self::$businesses;
    }

    public static function find($id) {
        foreach (self::$businesses as $business) {
            if ($business['id'] == $id) {
                return $business;
            }
        }
        return null;
    }

    public static function findBySlug($slug) {
        foreach (self::$businesses as $business) {
            if ($business['slug'] === $slug) {
                return $business;
            }
        }
        return null;
    }

    public static function findByCategory($categorySlug) {
        if ($categorySlug === 'todos') {
            return self::all();
        }
        return array_filter(self::$businesses, function ($b) use ($categorySlug) {
            return $b['category_slug'] === $categorySlug;
        });
    }

    public static function getCategories() {
        return [
            ['slug' => 'todos', 'name' => 'Todos', 'count' => count(self::$businesses)],
            ['slug' => 'comida', 'name' => 'Comida', 'count' => 1],
            ['slug' => 'farmacias', 'name' => 'Farmacias', 'count' => 1],
            ['slug' => 'supermercados', 'name' => 'Supermercados', 'count' => 1],
        ];
    }
}
