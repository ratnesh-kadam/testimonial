<?php

add_action( 'init', function() {
	register_block_type( 'responsive-block-editor-addons/testimonial', [
		'editor_script' => 'responsive-block-editor-addons-testimonial',
		'style' => 'responsive-block-editor-addons-testimonial',
		'editor_style' => 'responsive-block-editor-addons-testimonial-editor',
	] );

	wp_set_script_translations( 'responsive-block-editor-addons/testimonial', 'testimonial' );
} );
