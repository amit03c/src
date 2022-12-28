import React from 'react';

const AddonItem = ({
  name,
  category,
  product,
  spiceLevel,
  allergies,
  minQuantity,
  maxQuantity,
  createdDate,
  status,
  priceLower,
  priceUpper,
}) => {
  return (
    <>
      <div className="addons-item">
        <div className="addons-item-row">
          <div className="addons-options">
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
        <div className="addons-content">
          <div className="addons-title">{name}</div>
        </div>
        <div className="addons-metas">
          {category &&
          <div className="meta-item full">
            <div className="meta-icon"><i className="fa-light fa-fw fa-list-tree"></i></div>
            <div className="meta-content">
              <div className="meta-label">Categories</div>
              <div className="meta-data">
                {(category.length > 0)?
                  (category.map((item) => (
                    <span key={item._id}>{item.name}</span>
                  ))):('No')
                }
              </div>
            </div>
          </div>
          }
          {product &&
          <div className="meta-item full">
            <div className="meta-icon"><i className="fa-light fa-fw fa-pot-food"></i></div>
            <div className="meta-content">
              <div className="meta-label">Products</div>
              <div className="meta-data">
                {(product.length > 0)?
                  (product.map((item) => (
                    <span key={item._id}>{item.name}</span>
                  ))):('No')
                }
              </div>
            </div>
          </div>
          }
          {spiceLevel &&
          <div className="meta-item">
            <div className="meta-icon"><i className="fa-light fa-fw fa-pepper-hot"></i></div>
            <div className="meta-content">
              <div className="meta-label">Spice Level</div>
              <div className="meta-data">
                {(spiceLevel.length > 0)?
                  (spiceLevel.map((item) => (
                    <span key={item._id}>{item.name}</span>
                  ))):('No')
                }
              </div>
            </div>
          </div>
          }
          {allergies &&
          <div className="meta-item">
            <div className="meta-icon"><i className="fa-light fa-fw fa-person-dots-from-line"></i></div>
            <div className="meta-content">
              <div className="meta-label">Allergies</div>
              <div className="meta-data">
                {(allergies.length > 0)?
                  (allergies.map((item) => (
                    <span key={item._id}>{item.name}</span>
                  ))):('No')
                }
              </div>
            </div>
          </div>
          }
        </div>
        <div className="addons-item-row mt-3">
          <div className="addons-price">
            <div className="price">{(priceLower !== 'null')?'€'+priceLower:''}{(priceUpper !== 'null')?' - €'+priceUpper:''}</div>
          </div>
        </div>
        {(minQuantity || maxQuantity || createdDate) &&
        <div className="addons-item-row border-t">
          <div className="addons-info">
            {minQuantity &&
            <div className="info">
              <div className="info-label">Min. Quantity</div>
              <div className="info-data">{minQuantity}</div>
            </div>
            }
            {maxQuantity &&
            <div className="info">
              <div className="info-label">Max. Quantity</div>
              <div className="info-data">{maxQuantity}</div>
            </div>
            }
          </div>
          <div className="addons-info">
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

export default AddonItem;