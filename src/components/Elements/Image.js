import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Image = ({src, width, height, alt, effect, classes}) => {
  console.log(src)
  return (
    <>
      <LazyLoadImage
        src={src}
        width={width} 
        height={height}
        alt={alt}
        effect={effect}
        className={'w-100 h-100 ' + (classes)}
      />
    </>
  );
};

export default Image;