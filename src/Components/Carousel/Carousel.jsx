import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Carousel.css';
import { carousel } from '../data/menudata';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselImages from './section/carouselImages';

const Carousel = (props) => {
  const [slideWidth, setSlideWidth] = useState();
  const [slideImageWidth, setSlideImageWidth] = useState();
  const [containerWidth, setContainerWidth] = useState();
  const [stopCarousel, setStopCarousel] = useState(false);
  const [slideState, setSlideState] = useState({
    number: 1,
    hasMotion: true,
  });

  const threeCarousel = [...carousel];

  const slideRef = useRef();
  const slideMargin = 20;

  const resize = () => {
    let slideImageWidth = window.innerWidth * 0.9;
    let slideWidth = slideImageWidth + slideMargin;
    let containerWidth = slideImageWidth;
    if (window.innerWidth >= 1200) {
      slideImageWidth = 1060;
      containerWidth = 1060;
      slideWidth = 1080;
    }

    slideRef.current.style.transform = `translateX(-${slideWidth}px)`;

    setSlideWidth(slideWidth);
    setContainerWidth(containerWidth);
    setSlideImageWidth(slideImageWidth);
  };

  const onMoveSlide = useCallback(
    (slide) => {
      console.log('move');
      slideRef.current.style.transform = `translateX(-${slide.number * slideWidth}px)`;
      slideRef.current.style.transition = slide.hasMotion ? 'all 0.5s ease-in-out' : '';
    },
    [slideWidth]
  );

  const onHandlePrev = useCallback(() => {
    if (slideState.number <= 1) {
      setSlideState({
        number: 9,
        hasMotion: false,
      });
    } else {
      setSlideState({
        number: slideState.number - 1,
        hasMotion: true,
      });
    }
  }, [slideState]);

  const onHandleNext = useCallback(() => {
    if (slideState.number >= 9) {
      setSlideState({
        number: 1,
        hasMotion: false,
      });
    } else {
      setSlideState({
        number: slideState.number + 1,
        hasMotion: true,
      });
    }
  }, [slideState]);

  const MoveCarousel = useCallback(() => setTimeout(() => onHandleNext(), 3000), [onHandleNext]);

  const setInitialPosition = useCallback(() => {
    window.addEventListener('resize', () => resize());
    resize();
  }, []);

  useEffect(() => {
    onMoveSlide(slideState);
  }, [slideState, onMoveSlide]);

  useEffect(() => {
    if (stopCarousel) {
      clearTimeout(MoveCarousel);
    } else {
      setTimeout(() => onHandleNext(), 3000);
    }
  }, [stopCarousel, slideState, onHandleNext, MoveCarousel]);

  useEffect(() => {
    setInitialPosition();
  }, [setInitialPosition]);

  return (
    <div
      className='container'
      onMouseEnter={() => {
        setStopCarousel(true);
      }}
      onMouseLeave={() => {
        setStopCarousel(false);
      }}
    >
      <button className='carouselBtn prevArrowButton' onClick={onHandlePrev}>
        <ArrowBackIosIcon />
      </button>
      <div className='carouselContainer' style={{ maxWidth: containerWidth }}>
        <div className='carouselList' ref={slideRef}>
          {threeCarousel.map((image, index) => (
            <CarouselImages key={index} index={index} slideState={slideState} image={image} slideImageWidth={slideImageWidth} />
          ))}
        </div>
      </div>
      <button className='carouselBtn nextArrowButton' onClick={onHandleNext}>
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default Carousel;
