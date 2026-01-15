<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class ProductsQuery implements QueryInterface
{
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'products',
            [
                'type'        => ['list_of' => 'Product'],
                'description' => __('Get all published WooCommerce products', 'wpcbooking'),
                'args'        => self::get_query_fields(),
                'resolve'     => self::get_resolver(),
            ]
        );

        register_graphql_object_type('Product', [
            'description' => __('WooCommerce Product', 'wpcbooking'),
            'fields'      => [
                'id'    => [
                    'type'        => 'ID',
                    'description' => __('Product ID', 'wpcbooking'),
                ],
                'name'  => [
                    'type'        => 'String',
                    'description' => __('Product name', 'wpcbooking'),
                ],
                'price' => [
                    'type'        => 'String',
                    'description' => __('Product price', 'wpcbooking'),
                ],
                'thumbnail' => [
                    'type'        => 'String',
                    'description' => __('Product thumbnail URL', 'wpcbooking'),
                ],
            ],
        ]);
    }

    public static function get_query_fields(): array
    {
        return [
            'limit' => [
                'type'        => 'Int',
                'description' => __('Number of products to return', 'wpcbooking'),
            ],
        ];
    }

    public static function get_resolver(): callable
    {
        return function ($source, array $args, AppContext $context, ResolveInfo $info) {
            $limit = $args['limit'] ?? -1;

            $query_args = [
                'post_type'      => 'product',
                'post_status'    => 'publish',
                'posts_per_page' => $limit,
                'orderby'        => 'title',
                'order'          => 'ASC',
            ];

            $products_query = new \WP_Query($query_args);
            $products = [];

            if ($products_query->have_posts()) {
                while ($products_query->have_posts()) {
                    $products_query->the_post();
                    $product_id = get_the_ID();
                    $product = wc_get_product($product_id);

                    if ($product) {
                        $products[] = [
                            'id'        => $product_id,
                            'name'      => $product->get_name(),
                            'price'     => $product->get_price(),
                            'thumbnail' => self::get_product_image_src_or_placeholder($product, 'thumbnail'),
                        ];
                    }
                }
                wp_reset_postdata();
            }

            return $products;
        };
    }

    private static function get_product_image_src_or_placeholder($product, $size = 'medium'): string
    {
        $thumbnail_id = $product->get_image_id();

        if (!$thumbnail_id) {
            if (function_exists('wc_placeholder_img_src')) {
                return wc_placeholder_img_src($size);
            }
            return '';
        }

        $image_path = get_attached_file($thumbnail_id);

        if (!$image_path || !file_exists($image_path)) {
            if (function_exists('wc_placeholder_img_src')) {
                return wc_placeholder_img_src($size);
            }
            return '';
        }

        $image_src_data = wp_get_attachment_image_src($thumbnail_id, $size);
        if ($image_src_data && isset($image_src_data[0])) {
            return $image_src_data[0];
        }

        if (function_exists('wc_placeholder_img_src')) {
            return wc_placeholder_img_src($size);
        }
        return '';
    }
}

