<?php

namespace Wpcbooking\Models;

/**
 * Blocks model for parsing and retrieving Gutenberg blocks.
 * Provides static methods for block parsing and configuration retrieval.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class BlocksModel
{
    /**
     * Get all booking blocks from post content.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $post_id Post ID
     * @return array|null Array of blocks or null if post not found
     */
    public static function get_blocks(int $post_id): ?array
    {
        $allowed_blocks = booking_get_all_block_names();
        $post = get_post($post_id);
        if (!$post) return null;
        $blocks = parse_blocks($post->post_content);
        $result_blocks = [];
        $index = 1;
        foreach ($blocks as $block) {
            if (isset($block['blockName']) && in_array($block['blockName'], $allowed_blocks)) {
                $result_blocks[$index] = $block;
                $index++;
            }
        }
        return $result_blocks;
    }

    /**
     * Get step section blocks from post content.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $post_id Post ID
     * @return array|null Array of step blocks indexed by step number or null if post not found
     */
    public static function get_step_blocks(int $post_id): ?array
    {

        $post = get_post($post_id);
        if (!$post) return null;
        $blocks = parse_blocks($post->post_content);

        $result_blocks = [];
        $index = 1;
        foreach ($blocks as $block_index => $block) {
            if (!isset($block['blockName']) || $block['blockName'] !== 'booking/booking-step-section') continue;

            $result_blocks[$index] = $block;
            $index++;
        }
        return $result_blocks;
    }


    /**
     * Parse and get block attributes by unique field ID.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $post_id Post ID
     * @param string $unique_id Block field ID
     * @return array|null Block attributes array or null if not found
     */
    public static function parse_block_by_unique_id(int $post_id, string $unique_id): ?array
    {
        $blocks = self::get_blocks($post_id);
        if (!$blocks) return null;
        foreach ($blocks as $i => $block) {
            if (isset($block['attrs']['field_id']) && $block['attrs']['field_id'] === $unique_id) {
                return $block['attrs'];
            }
        }

        return null;
    }

    /**
     * Get all step-section blocks configuration from post content.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $post_id Post ID
     * @return array|null Array of step-section blocks indexed by step number or null if post not found
     */
    public static function get_all_blocks_config(int $post_id): ?array
    {

        $post = get_post($post_id);
         if (!$post) return null;
        $blocks = parse_blocks($post->post_content);
        $result_blocks = [];
        $index = 1;
        foreach ($blocks as $block) {
            if (!isset($block['blockName']) || $block['blockName'] != 'booking/step-section') continue;
            $result_blocks[$index] = $block;
            $index++;
        }

        return $result_blocks;
    }
}
