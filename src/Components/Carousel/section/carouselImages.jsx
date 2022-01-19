import React, { useCallback, useEffect, useState } from 'react';
import './carouselImages.css';

const CarouselImages = ({ index, slideState, image, slideImageWidth }) => {
  const [infoDisplay, setInfoDisplay] = useState();

  const ChangeDisplay = useCallback(() => {
    let infoDisplay = 'none';

    if (window.innerWidth > 1200) {
      if (index === slideState.number) {
        infoDisplay = 'block';
      } else if (index - 1 === slideState.number) {
        infoDisplay = 'none';
      } else if (index + 1 === slideState.number) {
        infoDisplay = 'none';
      }
    } else if (window.innerWidth <= 1200) {
      infoDisplay = 'block';
    }
    setInfoDisplay(infoDisplay);
  }, [index, slideState]);

  useEffect(() => {
    ChangeDisplay();
  }, [slideState, ChangeDisplay]);

  return (
    <li className='carouselImage' key={index} id={image.id}>
      <img className='image' src={image.src} alt={image.alt} style={{ width: slideImageWidth }} />
      <div className='carouselInformation' style={{ display: infoDisplay }}>
        <div className='carouselInfo'>
          <h2 className='carouselInfoTitle'>{image.infoTitle}</h2>
          <span className='carouselInfomation'>{image.infomation}</span>
        </div>
        <hr className='carouselDivider' />
        <button className='moveToDetail'>바로가기{' >'}</button>
      </div>
    </li>
  );
};

export default CarouselImages;
