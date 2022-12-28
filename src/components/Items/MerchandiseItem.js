import React from 'react';
import Image from "../Elements/Image";
import RadioGroup from "../Form/RadioGroup";

const MerchandiseItem = ({
  productId,
  name,
  image,
  points,
  stock,
  createdBy,
  createdDate,
  updatedDate,
  status,
}) => {

  const staticStockArr = [
    {
      _id: 1,
      name: "In stock",
      color: "success",
      current: stock === 1 ? true : false,
    },
    {
      _id: 2,
      name: "Out of stock",
      color: "danger",
      current: stock === 2 ? true : false,
    },
  ];


  return (
    <>
      <div className="merchandise-item">
        <div className="merchandise-item-row">
          <div className="merchandise-options">
            <div className={"status " + ((status === 1)?'published':'draft')}>{(status === 1)?'published':'draft'}</div>
            <div className="action-dropdown dropdown">
              <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-fw fa-ellipsis-vertical"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <button type="button" className="dropdown-item"><i className="fa-regular fa-fw fa-pen-to-square"></i>Edit</button>
                <button type="button" className="dropdown-item" onClick={() => console.log(productId)}><i className="fa-regular fa-fw fa-arrow-up-from-dotted-line"></i>Draft</button>
                <button type="button" className="dropdown-item standOut"><i className="fa-regular fa-fw fa-trash-can"></i>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="merchandise-item-row unset-align">
          <div className="merchandise-image">
            <Image src={image} alt={name} width={'100%'} height={'100%'} effect={'blur'}/>
          </div>
          <div className="merchandise-content">
            <div className="merchandise-title">{name}</div>
            <div className="merchandise-metas">
              {points >= 0 &&
              <div className="meta-item">
                <div className="meta-icon"><i className="fa-light fa-fw fa-coins"></i></div>
                <div className="meta-content">
                  <div className="meta-label">Points</div>
                  <div className="meta-data">{points}</div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        
        <div className="merchandise-item-row mt-3">
          <div className="merchandise-stock">
            {staticStockArr.length &&
            <RadioGroup data={staticStockArr} inputName={'item_stock'+(productId)} labelClass={'bg-shades-04'}/>
            }
          </div>
        </div>
        {(createdBy || createdDate || updatedDate) &&
        <div className="merchandise-item-row border-t">
          <div className="merchandise-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
          </div>
          <div className="merchandise-info">
            {createdDate &&
            <div className="info">
              <div className="info-label">Created Date</div>
              <div className="info-data">{createdDate}</div>
            </div>
            }
            {updatedDate &&
            <div className="info">
              <div className="info-label">Last Updated</div>
              <div className="info-data">{updatedDate}</div>
            </div>
            }
          </div>
        </div>
        }
      </div>
    </>
  );
};

export default MerchandiseItem;