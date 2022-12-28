import React from 'react';
import { Link } from "react-router-dom";
import Image from "../Elements/Image";

const Brand = ({image, alt}) => {
  return (
    <>
      <div className="brand">
        <Link to="/" className="logo">
          <Image src={image} alt={alt} width={'100%'} height={'100%'} effect={'blur'}/>
        </Link>
      </div>
    </>
  );
};

export default Brand;