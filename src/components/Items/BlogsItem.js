import React from 'react';

const BlogsItem = ({
  name,
  authorName,
  views,
  createdBy,
  createdDate,
  updatedDate,
  status,
}) => {
  return (
    <>
      <div className="blogs-item">
        <div className="blogs-item-row">
          <div className="blogs-options">
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
        <div className="blogs-content">
          <div className="blogs-label">Blog title</div>
          <div className="blogs-title">{name}</div>
          
        </div>
        <div className="blogs-metas">
        <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Blog Views</div>
              <div className="meta-data">{views}</div>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Author</div>
              <div className="meta-data">{authorName}</div>
            </div>
          </div>
        </div>
      
        
        {(createdBy || createdDate || updatedDate) &&
        <div className="blogs-item-row border-t">
          <div className="blogs-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
          
          </div>
          <div className="blogs-info">
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

export default BlogsItem;