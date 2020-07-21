/**
 * Internal dependencies
 */
import Testimonial from "./testimonial";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      testimonialName,
      testimonialTitle,
      testimonialContent,
      testimonialAlignment,
      testimonialImgURL,
      testimonialTextColor,
      testimonialFontSize,
    } = this.props.attributes;

    return (
      <Testimonial {...this.props}>
        <RichText.Content
          tagName="div"
          className="responsive-block-editor-addons-testimonial-text"
          style={{
            textAlign: testimonialAlignment,
            fontSize: testimonialFontSize,
          }}
          value={testimonialContent}
        />

        <div className="responsive-block-editor-addons-testimonial-info">
          <div className="responsive-block-editor-addons-testimonial-inner-block">
            {testimonialImgURL && (
              <div className="responsive-block-editor-addons-testimonial-avatar-wrap">
                <div className="responsive-block-editor-addons-testimonial-image-wrap">
                  <img
                    className="responsive-block-editor-addons-testimonial-avatar"
                    src={testimonialImgURL}
                    alt="avatar"
                  />
                </div>
              </div>
            )}

            <div className="responsive-block-editor-addons-testimonial-details">
              {testimonialName && (
                <RichText.Content
                  tagName="h2"
                  className="responsive-block-editor-addons-testimonial-name"
                  style={{
                    color: testimonialTextColor
                      ? testimonialTextColor
                      : "#32373c",
                    fontSize: testimonialFontSize + 10,
                  }}
                  value={testimonialName}
                />
              )}

              {testimonialTitle && (
                <RichText.Content
                  tagName="small"
                  className="responsive-block-editor-addons-testimonial-title"
                  style={{
                    color: testimonialTextColor
                      ? testimonialTextColor
                      : "#32373c",
                    fontSize: testimonialFontSize - 3,
                  }}
                  value={testimonialTitle}
                />
              )}
            </div>
          </div>
        </div>
      </Testimonial>
    );
  }
}
