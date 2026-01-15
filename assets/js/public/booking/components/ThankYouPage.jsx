import { h, Fragment } from 'preact';
import { __ } from '@wordpress/i18n';

const ThankYouPage = ({
  heading = __('Tak ... Lad os gå ud og nyde festen', 'wpcbooking'),
  text = null,
  background_image = null,
  button_link = null,
  button_label = null
}) => {
  // Default text if not provided
  const defaultText = (
    <Fragment>
      <p>{__('Vi har modtaget dine ønsker til dit kommende event, og vores team går straks i gang med at gennemgå dem. Inden længe kontakter vi dig personligt, så vi sammen kan skræddersy det perfekte arrangement efter dine behov og idéer.', 'wpcbooking')}</p>
      <p>{__('Vi glæder os til at skabe en uforglemmelig oplevelse for dig!', 'wpcbooking')}</p>
    </Fragment>
  );

  const displayText = text || defaultText;
  const buttonTitle = button_label || button_link?.title || __('Tilbage til forsiden', 'wpcbooking');
  const buttonUrl = button_link?.url || '/';
  const buttonTarget = button_link?.target || '_self';

  // Convert image_id to URL if needed
  const getImageUrl = () => {
    if (!background_image) return null;
    
    // If it's already a URL, return it
    if (typeof background_image === 'string' && (background_image.startsWith('http') || background_image.startsWith('/'))) {
      return background_image;
    }
    
    // If it's a number (image_id), try to get URL from WordPress REST API
    if (typeof background_image === 'number' || (typeof background_image === 'string' && /^\d+$/.test(background_image))) {
      // Try to get from window.wpcbooking_public if available
      if (window.wpcbooking_public?.rest_url) {
        return `${window.wpcbooking_public.rest_url}wp/v2/media/${background_image}`;
      }
      // Fallback: assume it's already a URL or return null
      return null;
    }
    
    return background_image;
  };

  const imageUrl = getImageUrl();

  return (
    <div>
      <section className="py-200p overflow-hidden">
        <div className="booking-thankyou cs-container cs-grid relative">
          {/* Gradient Background */}
          <div className="col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full w-[110vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-[80px]">
            {/* h1 gradient background */}
          </div>

          {/* Background Image */}
          <div className="col-[7/span_5] mx-th-gap row-span-full self-center">
            <div className="aspect-w-[580] aspect-h-[740] cs-containbox">
              {imageUrl && (
                <img src={imageUrl} alt="" />
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-[2/span_8] row-span-full py-170p text-white relative z-20">
            <h1 
              id="thankyou" 
              className="af-h1 font-black relative before:absolute before:top-0 before:-left-120p before:w-85p before:h-85p before:rounded-full before:bg-th-yellow"
            >
              {heading}
            </h1>
            <div className="w-3/5 mt-80p font-poppins text-2xl leading-[3rem] font-light">
              {typeof displayText === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: displayText }} />
              ) : (
                displayText
              )}
            </div>
          </div>

          {/* Button */}
          <div className="col-[2/span_8] row-span-full relative z-20">
            <div className="absolute left-0 bottom-0 translate-y-[42%]">
              <a 
                href={buttonUrl} 
                target={buttonTarget}
                className="cs-form-button-prev w-fit"
              >
                {buttonTitle}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouPage;

