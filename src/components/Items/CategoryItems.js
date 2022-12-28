import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { hostUrl } from '../../config/host';
import Confirm from '../Elements/Confirm';

const CategoryItems = ({
  categoryId,
  image,
  name,
  descriptions,
  createdBy,
  createdDate,
  updatedDate,
  status,
  queryCategory,
  detailsFetch,
  setEditId,
  setEditModal,
}) => {

  const queryClient = useQueryClient();

  const [deleteModal, setDeleteModal] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };

  const deleteCategory = useMutation(
    (delCategoryId) =>
      axios
        .post(
          `${hostUrl}/product_categories/remove`,
          delCategoryId,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryCategory);
          queryClient.removeQueries({
            queryKey: ["catgories"],
            type: "inactive",
          });
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  const statusChangeCategory = useMutation(
    (changeStsCategory) =>
      axios
        .post(
          `${hostUrl}/product_categories/status-change`,
          changeStsCategory,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryCategory);
          queryClient.removeQueries({
            queryKey: ["categories"],
            type: "inactive",
          });
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );


  return (
    <>
      <div className="category-item">
        <div className="category-item-row">
          <div className="category-content">
            <div className="category-image"><img src={image} /></div>
            <div className='category-details'>
              <div className="category-title">{name}</div>
              <div className="category-descriptions">
              <span>Descriptions</span>
              <div className='des'>{descriptions}</div>
              </div>
            </div>
          </div>
          <div className="category-options">
            <div className={"status " + (status ? 'published' : 'draft')}>{status ? 'published' : 'draft'}</div>
            <div className="action-dropdown dropdown">
              <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-fw fa-ellipsis-vertical"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <button type="button" className="dropdown-item" onClick={() => {
                  setEditModal(true);
                  setEditId(categoryId);
                  detailsFetch();
                }}><i className="fa-regular fa-fw fa-pen-to-square"></i>Edit</button>
                <button type="button" className="dropdown-item" onClick={() => statusChangeCategory.mutate({
                  id: categoryId,
                  status: status ? false : true,
                })}><i className="fa-regular fa-fw fa-arrow-up-from-dotted-line"></i>Draft</button>
                <button type="button" className="dropdown-item standOut" onClick={() => setDeleteModal(true)}><i className="fa-regular fa-fw fa-trash-can"></i>Delete</button>
              </div>
            </div>
          </div>

        </div>



        {(createdBy || createdDate || updatedDate) &&
        <div className="category-item-row border-t">
          <div className="category-info">
            {createdBy &&
            <div className="info">
              <div className="info-label">Created By</div>
              <div className="info-data">{createdBy}</div>
            </div>
            }
          
          </div>
          <div className="category-info">
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
      <Confirm
        icon={"fa-regular fa-xmark"}
        iconColorClass={"bg-danger"}
        title={"Delete"}
        text={"Are you really want to delete this product?"}
        isOpen={deleteModal}
        confirmClose={() => setDeleteModal(false)}
        confirmSubmit={() => {
          deleteCategory.mutate({ id: categoryId });
        }}
      />
    </>
  );
};

export default CategoryItems;