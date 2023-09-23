import './MainContent.scss';

import SlideShow from '../slide-show/SlideShow';

export const MainContent = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/688574/pexels-photo-688574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      url: 'https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      url: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
  ];

  return (
    <div className="main-content">
      <SlideShow auto={true} images={images} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now playing...</div>
        <div className="paginate">Paginate</div>
      </div>
    </div>
  );
};
