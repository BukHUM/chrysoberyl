<?php
/**
 * Custom fields and meta boxes
 *
 * @package Chrysoberyl
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add custom meta boxes
 * (Additional Information and SEO Options removed — use Rank Math instead)
 */
function chrysoberyl_add_meta_boxes() {
    // No meta boxes; SEO and additional fields handled by Rank Math.
}
add_action( 'add_meta_boxes', 'chrysoberyl_add_meta_boxes' );
