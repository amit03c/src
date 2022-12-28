import React from 'react';

const CommentItem = ({
  name,
  description,
  authorName,
  authorEmail,
  createdBy,
  createdDate,
  updatedDate,
  status,
}) => {
  return (
    <>
      <div className="comment-item">
        <div className="comment-item-row">
          <div className="comment-options">
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
        <div className="comment-content">
          <div className="comment-label">Blog title</div>
          <div className="comment-title">{name}</div>
          
        </div>
        <div className="comment-metas">
          
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">Name</div>
              <div className="meta-data">{authorName}</div>
            </div>
          </div>
         
          <div className="meta-item">
            <div className="meta-content">
              <div className="meta-label">EMAIL</div>
              <div className="meta-data">{authorEmail}</div>
            </div>
          </div>
         
         
        </div>
        <div className="comment-content">
          <div className="comment-label mt-4">COMMENT</div>
          <div className="comment-text">{description}</div>
        </div>
        
        {(createdBy || createdDate || updatedDate) &&
        <div className="comment-item-row border-t">
          <div className="comment-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
          
          </div>
          <div className="comment-info">
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

export default CommentItem;