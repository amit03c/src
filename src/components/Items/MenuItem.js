import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Confirm from "../Elements/Confirm";
import RadioGroup from "../Form/RadioGroup";

const MenuItems = ({
  productId,
  name,
  type,
  category,
  isPopular,
  points,
  spiceLevel,
  allergies,
  addons,
  stock,
  createdBy,
  createdDate,
  updatedDate,
  plu_code,
  status,
  price,
  discountPercentage,
  queryKeyProduct,
  detailsFetch,
  setEditProductId,
  setEditModal,
}) => {
  const queryClient = useQueryClient();

  const [deleteModal, setDeleteModal] = useState(false);

  const [in_stock, setIn_stock] = useState(stock);

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
    {
      _id: 3,
      name: "Sold out for today",
      color: "warning",
      current: stock === 3 ? true : false,
    },
  ];

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };

  const deleteProduct = useMutation(
    (delProductId) =>
      axios
        .post(
          `https://dabbawalaapi.iosx.in:3091/api/v2/products/remove`,
          delProductId,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryKeyProduct);
          queryClient.removeQueries({
            queryKey: ["products"],
            type: "inactive",
          });
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  const statusChangeProduct = useMutation(
    (changeStsProduct) =>
      axios
        .post(
          `https://dabbawalaapi.iosx.in:3091/api/v2/products/status-change`,
          changeStsProduct,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryKeyProduct);
          queryClient.removeQueries({
            queryKey: ["products"],
            type: "inactive",
          });
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  const stockChangeProduct = useMutation(
    (changeStockProduct) =>
      axios
        .post(
          `https://dabbawalaapi.iosx.in:3091/api/v2/products/status-change`,
          changeStockProduct,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.removeQueries({
            queryKey: ["products"],
            type: "inactive",
          });
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  useEffect(() => {
    if(in_stock !== stock) {
      stockChangeProduct.mutate({
        id: productId,
        status: status,
        in_stock: in_stock
      })
    }
  }, [in_stock])
  return (
    <>
      <div className="menu-item mb-3">
        <div className="menu-item-row">
          <div className="menu-type">
            {type && (
              <div className={"type " + (type === "Veg" ? "veg" : "non-veg")}>
                <div className="type-icon"></div>
                <div className="type-title">
                  {type === "Veg" ? "veg" : "non-veg"}
                </div>
              </div>
            )}
          </div>
          <div className="menu-options">
            <div className={"status " + (status === 1 ? "published" : "draft")}>
              {status === 1 ? "published" : "draft"}
            </div>
            <div className="action-dropdown dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa-regular fa-fw fa-ellipsis-vertical"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    setEditModal(true);
                    setEditProductId(productId);
                    detailsFetch();
                  }}
                >
                  <i className="fa-regular fa-fw fa-pen-to-square"></i>Edit
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() =>
                    statusChangeProduct.mutate({
                      id: productId,
                      status: status === 1 ? 3 : 1,
                    })
                  }
                >
                  <i className="fa-regular fa-fw fa-arrow-up-from-dotted-line"></i>
                  {status === 1 ? "Draft" : "Publish"}
                </button>
                <button
                  type="button"
                  className="dropdown-item standOut"
                  onClick={() => setDeleteModal(true)}
                  // onClick={() => deleteProduct.mutate({ id: productId })}
                >
                  <i className="fa-regular fa-fw fa-trash-can"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-content">
          <div className="menu-title">
            {name}
            {isPopular && <span className="popular">Popular</span>}
          </div>
          <div className="menu-categories">
            {category.map((item) => (
              <span key={item._id}>{item.title}</span>
            ))}
          </div>
        </div>
        <div className="menu-metas">
          {points && points >= 0 && (
            <div className="meta-item">
              <div className="meta-icon">
                <i className="fa-light fa-fw fa-coins"></i>
              </div>
              <div className="meta-content">
                <div className="meta-label">Points</div>
                <div className="meta-data">{points ? points : "No"}</div>
              </div>
            </div>
          )}
          {spiceLevel && (
            <div className="meta-item">
              <div className="meta-icon">
                <i className="fa-light fa-fw fa-pepper-hot"></i>
              </div>
              <div className="meta-content">
                <div className="meta-label">Spice Level</div>
                <div className="meta-data">
                  {spiceLevel.length > 0
                    ? spiceLevel.map((item) => (
                        <span key={item._id}>{item.title}</span>
                      ))
                    : "No"}
                </div>
              </div>
            </div>
          )}
          {allergies && (
            <div className="meta-item">
              <div className="meta-icon">
                <i className="fa-light fa-fw fa-person-dots-from-line"></i>
              </div>
              <div className="meta-content">
                <div className="meta-label">Allergies</div>
                <div className="meta-data">
                  {allergies.length > 0
                    ? allergies.map((item) => (
                        <span key={item._id}>{item.title}</span>
                      ))
                    : "No"}
                </div>
              </div>
            </div>
          )}
          {addons && (
            <div className="meta-item">
              <div className="meta-icon">
                <i className="fa-light fa-fw fa-grid-2-plus"></i>
              </div>
              <div className="meta-content">
                <div className="meta-label">Add on</div>
                <div className="meta-data">
                  {addons.length > 0
                    ? addons.map((item) => (
                        <span key={item._id}>{item.title}</span>
                      ))
                    : "No"}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="menu-item-row mt-3">
          <div className="menu-stock">
            <RadioGroup
              data={staticStockArr}
              setData={setIn_stock}
              inputName={"item_stock" + productId}
              labelClass={"bg-shades-04"}
            />
          </div>
          <div className="menu-price">
            {discountPercentage > 0 ? (
              <>
                <div className="price strike">€{price}</div>
                <div className="price">€{discountPercentage}</div>
              </>
            ) : (
              <>
                <div className="price">€{price}</div>
              </>
            )}
          </div>
        </div>
        {(createdBy || plu_code || createdDate || updatedDate) && (
          <div className="menu-item-row border-t">
            <div className="menu-info">
              {createdBy && (
                <div className="info">
                  <div className="info-label">Created By</div>
                  <div className="info-data">{createdBy}</div>
                </div>
              )}
              {plu_code && (
                <div className="info">
                  <div className="info-label">PLU Code</div>
                  <div className="info-data">{plu_code}</div>
                </div>
              )}
            </div>
            <div className="menu-info">
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
      <Confirm
        icon={"fa-regular fa-xmark"}
        iconColorClass={"bg-danger"}
        title={"Delete"}
        text={"Are you really want to delete this product?"}
        isOpen={deleteModal}
        confirmClose={() => setDeleteModal(false)}
        confirmSubmit={() => {
          deleteProduct.mutate({ id: productId });
        }}
      />
    </>
  );
};

export default MenuItems;
