import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import ImageUploadPreview from "../Form/ImageUploadPreview";
import { dietsApiData } from "../../services/api";
import Modal from "../Elements/Modal";

const AddDiets = ({ setState,isSuccess }) => {
  
  const [addTitleDiet, setAddTitleDiet] = useState();
  const [radioDiet, setRedioDiet] = useState();

  const [uploadImage, setUploadImage] = useState([]);

  console.log(uploadImage)

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };

  const handelUpload = useMutation((items) =>
    dietsApiData(
      "POST",
      "/product_ingredients/create",
      {
        // title: items.title,
        // image: items.image,
        // type: 3,
        // status: items.status,
      },
      config.headers
    )
      .then((res) => {
        if (res.status === 200) {
          setState(false);
          isSuccess(true)
          setUploadImage([])


        }
      })
      .catch((e) => {})
  );

  // const uploadData = [

  // ];
  const publishedData = [
    { _id: 1, label: "Published", inputName: "publish_status", current: true },
    { _id: 2, label: "Draft", inputName: "publish_status", current: false },
  ];
  const removeImage=(index)=>{
    const image=uploadImage.filter((ele,i)=>i!==index)
    setUploadImage(image)
 }
  return (
    <>
      <div className="px-2">
        <div className="row divide-x">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <Input
                    label={"Title"}
                    inputRequired={true}
                    inputType={"text"}
                    inputPlaceholder={"Example . Veg"}
                    inputName={""}
                    setState={setAddTitleDiet}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <RadiosLabel
                    data={publishedData}
                    label={"Status"}
                    inputRequired={true}
                    setRadio={setRedioDiet}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex flex-wrap gap-3">
                  <Button
                    label={"Save"}
                    functions={() => {
                      handelUpload.mutate({
                        title: addTitleDiet ? addTitleDiet : "",
                        image: uploadImage[0] ? uploadImage[0].image : "",
                        type: 3,
                        status: radioDiet === 1 ? true : false,
                      });
                    }}
                  />
                  <Button label={"Cancel"} classes={"main-button-alt"} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row">
              <div className="col">
                <ImageUploadPreview
                  data={uploadImage}
                  label={"Upload Image"}
                  inputRequired={true}
                  onChange={(img)=>setUploadImage([img])}
                  onRemove={removeImage}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDiets;
