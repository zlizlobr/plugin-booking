<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class BlockDataType
 * 
 * GraphQL type definition for BlockData
 */
class BlockDataType
{
    /**
     * Registers the BlockData type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'BlockData',
            [
                'description' => __('Block data', 'wpcbooking'),
                'fields'      => [
                    'title' => [
                        'type'        => 'String',
                        'description' => __('Block title', 'wpcbooking'),
                    ],
                    'label_summary' => [
                        'type'        => 'String',
                        'description' => __('Summary label', 'wpcbooking'),
                    ],
                    'thumbnail_id' => [
                        'type'        => 'ID',
                        'description' => __('Thumbnail ID', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
