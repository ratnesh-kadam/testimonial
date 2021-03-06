<?php
/**
 * Plugin Name: Testimonial
 * Description: Gutenberg Block Testimonial
 * Version:     1.0.0
 * Author:      CyberChimps
 * Author URI:  https://github.com/ratnesh-kadam/testimonial.git
 * License:     GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package         Testimonial
 */

// Register Block Scripts.
add_action(
	'init',
	function() {
		$asset_file   = __DIR__ . '/index.asset.php';
		$asset        = file_exists( $asset_file ) ? require_once $asset_file : null;
		$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : array();
		$version      = isset( $asset['version'] ) ? $asset['version'] : filemtime( __DIR__ . '/index.js' );

		// Block JS.
		wp_register_script(
			'responsive-block-editor-addons-testimonial',
			plugins_url( 'index.js', __FILE__ ),
			$dependencies,
			$version,
			true
		);

		// Block front end style.
		wp_register_style(
			'responsive-block-editor-addons-testimonial',
			plugins_url( 'style.css', __FILE__ ),
			array(),
			filemtime( __DIR__ . '/style.css' )
		);

		// Block editor style.
		wp_register_style(
			'responsive-block-editor-addons-testimonial-editor',
			plugins_url( 'editor.css', __FILE__ ),
			array(),
			filemtime( __DIR__ . '/editor.css' )
		);
	}
);

require_once __DIR__ . '/blocks/testimonial.php';
