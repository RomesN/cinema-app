import './SlideShow.scss';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SlideShow = ({ images, auto, showArrows }) => {
  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0
  });
  const [sliderInterval, setSliderInterval] = useState(0);
  const { slideShow, slideIndex } = state;

  useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(autoMoveSlide, 5000);
      setSliderInterval(timeInterval);

      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
  }, []);

  const autoMoveSlide = () =>
    setState((prev) => {
      let newIndex = prev.slideIndex + 1;
      newIndex = newIndex >= images.length ? 0 : newIndex;
      return {
        slideIndex: newIndex,
        slideShow: images[newIndex]
      };
    });

  const moveSlideWithArrows = (type) => {
    let index = slideIndex;
    if (type === 'prev') {
      if (slideIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (slideIndex < images.length) {
        index += 1;
      }
      if (index === images.length) {
        index = 0;
      }
    }
    setState((prev) => ({
      ...prev,
      slideIndex: index,
      slideShow: images[index]
    }));
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideWithArrows('prev')} />
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideWithArrows('next')} />
      </div>
    );
  };

  const Indicators = (props) => {
    const { currentSlide } = props;
    const listIndicators = images.map((_slide, i) => {
      const btnClasses = i === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={btnClasses} key={i} />;
    });
    return <div className="slider-nav">{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {images && images.length && slideShow && (
            <div
              className="slider-image"
              style={{
                backgroundImage: `url(${slideShow.url})`
              }}
            ></div>
          )}
        </div>
        {showArrows && <RenderArrows />}
        <Indicators currentSlide={slideIndex} />
      </div>
    </>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired,
  currentSlide: PropTypes.number
};

export default SlideShow;
