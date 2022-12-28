import React from 'react';

const AuthorItem = ({
  name,
  description,
  createdBy,
  createdDate,
  updatedDate,
  status,
}) => {
  return (
    <>
      <div className="author-item">
        <div className="author-item-row">
          <div className="author-options">
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
        <div className="author-content">
          <div className="author-label">Name of the Author</div>
          <div className="author-title">{name}</div>
          
        </div>
        
        <div className="author-content">
          <div className="author-label mt-4">COMMENT</div>
          <div className="author-text">{description}</div>
        </div>
        
        {(createdBy || createdDate || updatedDate) &&
        <div className="author-item-row border-t">
          <div className="author-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
          
          </div>
          <div className="author-info">
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

export default AuthorItem;