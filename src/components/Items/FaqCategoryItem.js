import React from "react";
import RadioGroup from "../Form/RadioGroup";

const FaqCategoryItem = ({ name, createdBy, createdDate, updatedDate, status }) => {
  return (
    <>
      <div className="faqs-item">
        <div className="faqs-item-row">
          <div className="faqs-content">
            <div className="faqs-details">
              <span>Category Name</span>
              <div className="faqs-title">{name}</div>
            </div>
            
          </div>
          <div className="faqs-options">
            <div className={"status " + (status === 1 ? "published" : "draft")}>{status === 1 ? "published" : "draft"}</div>
            <div className="action-dropdown dropdown">
              <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-fw fa-ellipsis-vertical"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <button type="button" className="dropdown-item">
                  <i className="fa-regular fa-fw fa-pen-to-square"></i>Edit
                </button>
                <button type="button" className="dropdown-item">
                  <i className="fa-regular fa-fw fa-arrow-up-from-dotted-line"></i>Draft
                </button>
                <button type="button" className="dropdown-item standOut">
                  <i className="fa-regular fa-fw fa-trash-can"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {(createdBy || createdDate || updatedDate) && (
          <div className="faqs-item-row border-t">
            <div className="faqs-info">
              {createdBy && (
                <div className="info">
                  <div className="info-label">Created By</div>
                  <div className="info-data">{createdBy}</div>
                </div>
              )}
            </div>
            <div className="faqs-info">
              {createdDate && (
                <div className="info">
                  <div className="info-label">Created Date</div>
                  <div className="info-data">{createdDate}</div>
                </div>
              )}
              {updatedDate && (
                <div className="info">
                  <div className="info-label">Last Updated</div>
                  <div className="info-data">{updatedDate}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FaqCategoryItem;
