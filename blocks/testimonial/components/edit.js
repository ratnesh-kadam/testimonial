/**
 * Internal dependencies
 */
import classnames from "classnames";
import Inspector from "./inspector";
import Testimonial from "./testimonial";
import icons from "./../../icons";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, AlignmentToolbar, BlockControls, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

const ALLOWED_MEDIA_TYPES = ["image"];

export default class Edit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const {
      attributes: {
        testimonialName,
        testimonialTitle,
        testimonialContent,
        testimonialAlignment,
        testimonialImgURL,
        testimonialImgID,
        testimonialTextColor,
        testimonialFontSize,
      },
      setAttributes,
    } = this.props;

    const onRemoveImage = () => {
      setAttributes({
        testimonialImgURL: null,
        testimonialImgID: null,
      });
    };

    return [
      // Show the alignment toolbar on focus
      <BlockControls key="controls">
        <AlignmentToolbar
          value={testimonialAlignment}
          onChange={(value) => setAttributes({ testimonialAlignment: value })}
        />
      </BlockControls>,

      // Show the block controls on focus
      <Inspector {...{ setAttributes, ...this.props }} />,

      // Show the block markup in the editor
      <Testimonial {...this.props}>
        <RichText
          tagName="div"
          multiline="p"
          placeholder={__(
            "Add testimonial text...",
            "testimonial"
          )}
          keepPlaceholderOnFocus
          value={testimonialContent}
          formattingControls={["bold", "italic", "strikethrough", "link"]}
          className={classnames(
            "responsive-block-editor-addons-testimonial-text"
          )}
          style={{
            textAlign: testimonialAlignment,
            fontSize: testimonialFontSize,
          }}
          onChange={(value) => setAttributes({ testimonialContent: value })}
        />

        <div className="responsive-block-editor-addons-testimonial-info">
          <div className="responsive-block-editor-addons-testimonial-inner-block">
            <div className="responsive-block-editor-addons-testimonial-avatar-wrap">
              <div className="responsive-block-editor-addons-testimonial-image-wrap">
                <MediaUpload
                  buttonProps={{
                    className: "change-image",
                  }}
                  onSelect={(img) =>
                    setAttributes({
                      testimonialImgID: img.id,
                      testimonialImgURL: img.url,
                    })
                  }
                  allowed={ALLOWED_MEDIA_TYPES}
                  type="image"
                  value={testimonialImgID}
                  render={({ open }) => (
                    <Fragment>
                      <Button
                        className={
                          testimonialImgID
                            ? "responsive-block-editor-addons-change-image"
                            : "responsive-block-editor-addons-add-image"
                        }
                        onClick={open}
                      >
                        {!testimonialImgID ? (
                          icons.upload
                        ) : (
                          <img
                            className="responsive-block-editor-addons-testimonial-avatar"
                            src={testimonialImgURL}
                            alt="avatar"
                          />
                        )}
                      </Button>
                      {testimonialImgID && (
                        <Button
                          className="responsive-block-editor-addons-remove-image"
                          onClick={onRemoveImage}
                        >
                          <Dashicon icon={"dismiss"} />
                        </Button>
                      )}
                    </Fragment>
                  )}
                ></MediaUpload>
              </div>
            </div>

            <div className="responsive-block-editor-addons-testimonial-details">
              <RichText
                tagName="h2"
                placeholder={__("Add name", "testimonial")}
                keepPlaceholderOnFocus
                value={testimonialName}
                className="responsive-block-editor-addons-testimonial-name"
                style={{
                  color: testimonialTextColor,
                  margin: 0,
                  marginBottom: 5,
                  fontSize: testimonialFontSize + 10,
                }}
                onChange={(value) =>
                  this.props.setAttributes({ testimonialName: value })
                }
              />

              <RichText
                tagName="small"
                placeholder={__("Add title", "testimonial")}
                keepPlaceholderOnFocus
                value={testimonialTitle}
                className="responsive-block-editor-addons-testimonial-title"
                style={{
                  color: testimonialTextColor,
                  fontSize: testimonialFontSize - 3,
                }}
                onChange={(value) =>
                  this.props.setAttributes({
                    testimonialTitle: value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </Testimonial>,
    ];
  }
}
