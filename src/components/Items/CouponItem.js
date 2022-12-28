import React from 'react';

const CouponItem = ({
  name,
  description,
  validFrom,
  validThrough,
  limit,
  minSpent,
  maxSpent,
  createdBy,
  createdDate,
  status,
  price,
}) => {
  return (
    <>
      <div className="coupon-item">
        <div className="coupon-item-row">
          <div className="coupon-options">
            <div className={"status " + ((status === 1)?'published':'draft')}>{(status === 1)?'published':'draft'}</div>
            <div className="action-dropdown dropdown">
              <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-fw fa-ellipsis-vertical"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <button type="button" className="dropdown-item"><i className="fa-regular fa-fw fa-pen-to-square"></i>Edit</button>
                <button type="button" className="dropdown-item"><i className="fa-regular fa-fw fa-arrow-up-from-dotted-line"></i>Draft</button>
                <button type="button" className="dropdown-item standOut"><i className="fa-regular fa-fw fa-trash-can"></i>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="coupon-content">
          <div className="coupon-label">Coupon Code</div>
          <div className="coupon-title">{name}</div>
          <div className="coupon-label mt-4">Coupon Description</div>
          <div className="coupon-text">{description}</div>
        </div>
        <div className="coupon-metas">
          {validFrom &&
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Valid From</div>
              <div className="meta-data">{validFrom}</div>
            </div>
          </div>
          }
          {validThrough &&
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Valid Through</div>
              <div className="meta-data">{validThrough}</div>
            </div>
          </div>
          }
          {limit &&
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Limit</div>
              <div className="meta-data">{limit}</div>
            </div>
          </div>
          }
        </div>
        <div className="coupon-item-row mt-3">
          <div className="coupon-price">
            <div className="price">{price}</div>
          </div>
        </div>
        {(minSpent || maxSpent  || createdBy || createdDate) &&
        <div className="coupon-item-row border-t">
          <div className="coupon-info">
            {minSpent &&
            <div className="info">
              <div className="info-label">Min Spent Amount</div>
              <div className="info-data">{minSpent}</div>
            </div>
            }
            {maxSpent  &&
            <div className="info">
              <div className="info-label">Max Spent Amount</div>
              <div className="info-data">{maxSpent }</div>
            </div>
            }
          </div>
          <div className="coupon-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
            {createdDate &&
            <div className="info">
              <div className="info-label">Created Date</div>
              <div className="info-data">{createdDate}</div>
            </div>
            }
          </div>
        </div>
        }
      </div>
    </>
  );
};

export default CouponItem;