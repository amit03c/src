import React from 'react';
import Button from "../Form/Button";
import Image from "./Image";

const PreviewProduct = ({ data, previewClose = () => {}}) => {
  return (
    <>
      <div className="product-preview">
        <div className="preview-label">Preview of Food Item</div>
        <div className="preview">
          <div className="preview-inner">
            <div className="title">{data[0].name}</div>
            <div className="image">
              <Image src={data[0].image} alt={data[0].name} width={'100%'} height={'100%'} effect={'blur'}/>
            </div>
            <div className="actions">
              <i className="fa-light fa-fw fa-cart-shopping"></i>
              <div className="price">€{data[0].price}</div>
              <div className="action-label">Order Now</div>
            </div>
            <div className="ingredients">
              {data[0].ingredients.map((item) => (
              <div className="item" key={item._id}>
                <Image src={item.image} alt={item.name} width={'100%'} height={'100%'} effect={'blur'}/>
              </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Button label={'Close'} classes={'main-button-alt'} functions={previewClose}/>
        </div>
      </div>
    </>
  );
};

export default PreviewProduct;