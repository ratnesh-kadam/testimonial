/**
 * Testimonial Block Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from "classnames";

/**
 * Create a Testimonial wrapper Component
 */
export default class Testimonial extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        testimonialImgURL,
        testimonialBackgroundColor,
        testimonialTextColor,
        testimonialFontSize,
        testimonialCiteAlign,
      },
    } = this.props;

    return (
      <div
        style={{
          backgroundColor: testimonialBackgroundColor
            ? testimonialBackgroundColor
            : "#f2f2f2",
          color: testimonialTextColor ? testimonialTextColor : "#32373c",
        }}
        className={classnames(
          this.props.className,
          testimonialCiteAlign,
          { "responsive-block-editor-addons-has-avatar": testimonialImgURL },
          "responsive-block-editor-addons-font-size-" + testimonialFontSize,
          "responsive-block-editor-addons-block-testimonial"
        )}
      >
        {this.props.children}
      </div>
    );
  }
}
