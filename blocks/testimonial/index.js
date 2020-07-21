/**
 * BLOCK: Responsive Blocks Testimonial
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("responsive-block-editor-addons/testimonial", {
  title: __("Testimonial", "testimonial"),
  description: __(
    "Add a user testimonial with a name and title.",
    "testimonial"
  ),
  icon: "format-quote",
  category: "widgets",
  keywords: [
    __("testimonial", "testimonial"),
    __("quote", "testimonial"),
    __("responsive", "testimonial"),
  ],
  attributes: {
    testimonialName: {
      type: "array",
      selector: ".responsive-block-editor-addons-testimonial-name",
      source: "children",
    },
    testimonialTitle: {
      type: "array",
      selector: ".responsive-block-editor-addons-testimonial-title",
      source: "children",
    },
    testimonialContent: {
      type: "array",
      selector: ".responsive-block-editor-addons-testimonial-text",
      source: "children",
    },
    testimonialAlignment: {
      type: "string",
    },
    testimonialImgURL: {
      type: "string",
      source: "attribute",
      attribute: "src",
      selector: "img",
    },
    testimonialImgID: {
      type: "number",
    },
    testimonialBackgroundColor: {
      type: "string",
      default: "#f2f2f2",
    },
    testimonialTextColor: {
      type: "string",
      default: "#32373c",
    },
    testimonialFontSize: {
      type: "number",
      default: 18,
    },
    testimonialCiteAlign: {
      type: "string",
      default: "left-aligned",
    },
  },
  responsive_block_editor_addons_settings_data: {
    responsive_block_editor_addons_testimonial_testimonialFontSize: {
      title: __("Font Size", "testimonial"),
    },
    responsive_block_editor_addons_testimonial_testimonialCiteAlign: {
      title: __("Cite Alignment", "testimonial"),
    },
    responsive_block_editor_addons_testimonial_testimonialBackgroundColor: {
      title: __("Background Color", "testimonial"),
    },
    responsive_block_editor_addons_testimonial_testimonialTextColor: {
      title: __("Text Color", "testimonial"),
    },
  },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
