/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.editor;

// Import Inspector components
const { PanelBody, RangeControl, SelectControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Cite Alignment Options
    const citeAlignOptions = [
      {
        value: "left-aligned",
        label: __("Left Aligned", "responsive-block-editor-addons"),
      },
      {
        value: "center-aligned",
        label: __("Center Aligned", "responsive-block-editor-addons"),
      },
      {
        value: "right-aligned",
        label: __("Right Aligned", "responsive-block-editor-addons"),
      },
    ];

    // Setup the attributes
    const {
      attributes: {
        testimonialBackgroundColor,
        testimonialTextColor,
        testimonialFontSize,
        testimonialCiteAlign,
      },
      setAttributes,
    } = this.props;

    // Update color values
    const onChangeBackgroundColor = (value) =>
      setAttributes({ testimonialBackgroundColor: value });
    const onChangeTextColor = (value) =>
      setAttributes({ testimonialTextColor: value });

    return (
      <InspectorControls key="inspector">
        <PanelBody>
          <RangeControl
            label={__("Font Size", "responsive-block-editor-addons")}
            value={testimonialFontSize}
            onChange={(value) =>
              this.props.setAttributes({
                testimonialFontSize: value,
              })
            }
            min={14}
            max={24}
            step={1}
          />
          <SelectControl
            label={__("Cite Alignment", "responsive-block-editor-addons")}
            description={__(
              "Left, center or right align the cite name and title.",
              "responsive-block-editor-addons"
            )}
            options={citeAlignOptions}
            value={testimonialCiteAlign}
            onChange={(value) =>
              this.props.setAttributes({
                testimonialCiteAlign: value,
              })
            }
          />
        </PanelBody>
        <PanelColorSettings
          title={__("Background Color", "responsive-block-editor-addons")}
          initialOpen={false}
          colorSettings={[
            {
              value: testimonialBackgroundColor,
              onChange: onChangeBackgroundColor,
              label: __("Background Color", "responsive-block-editor-addons"),
            },
          ]}
        ></PanelColorSettings>
        <PanelColorSettings
          title={__("Text Color", "responsive-block-editor-addons")}
          initialOpen={false}
          colorSettings={[
            {
              value: testimonialTextColor,
              onChange: onChangeTextColor,
              label: __("Text Color", "responsive-block-editor-addons"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
