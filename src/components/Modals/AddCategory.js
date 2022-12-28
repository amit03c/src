import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import ImageUploadPreview from "../Form/ImageUploadPreview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { hostUrl } from "../../config/host";

const AddCategory = ({ details, isFetching, modalClose, queryCategory }) => {

  const queryClient = useQueryClient();


  const [ catId, setCatId] = useState("");
  const [ title, setTitle] = useState("");
  const [ description, setDescription] = useState("");
  const [ status, setStatus] = useState(true);
  
  const [uploadData, setUploadData] = useState([]);


  const [publishedData, setPublishedData] = useState([
    { _id: true, label: "Published", inputName: "publish_status", current: true },
    { _id: false, label: "Draft", inputName: "publish_status", current: false },
  ]);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };
  
  const submitCategory = useMutation(
    (newProduct) =>
      axios
        .post(
          `${hostUrl}/product_categories/create`,
          newProduct,
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
          setTitle("");
          setDescription("");
          setStatus(true);
          modalClose();
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  const submitEditedCategory = useMutation(
    (newProduct) =>
      axios
        .post(
          `${hostUrl}/product_categories/edit`,
          newProduct,
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
          setTitle("");
          setDescription("");
          setStatus(true);
          modalClose();
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  console.log(details);

  useEffect(() => {
    if(details) {
      setTitle(details ? details.title : "");
      setStatus(details ? details.status : "");
      setDescription(details ? details.description : "");
      setUploadData(details ? [{ _id: 1, image: details.image }] : []);
      setPublishedData([]);

      setCatId(details ? details._id : "")

      console.log(details.status === true ? true : false);

      setTimeout(() => {
        setPublishedData(
          details
            ? [
              {
                _id: true,
                label: "Published",
                inputName: "publish_status",
                current: details.status.toString() === 'true' ? true : false,
              },
              {
                _id: false,
                label: "Draft",
                inputName: "publish_status",
                current: details.status.toString() === 'false' ? true : false,
              },
            ]
            : []
        );
  
      }, 600)
    }
  }, [details])


  if (isFetching) {
    return(
      <div>Loading...</div>
    )
  }
  if(details) {
    return (
      <>
        <div className="px-2">
          <div className="row divide-x">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <Input label={"Title"} state={title} setState={setTitle} inputRequired={true} inputType={"text"} inputPlaceholder={"Example . Indian Drinks"} inputName={""} />
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <Textarea label={"Description"} state={description} setState={setDescription} inputRequired={true} inputPlaceholder={"Write description......."} inputName={""} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    {publishedData && <RadiosLabel setRadio={setStatus} data={publishedData} label={"Status"} inputRequired={true} />}
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap gap-3">
                    <Button label={"Save"} functions={() => {submitEditedCategory.mutate({
                        id: catId,
                        title: title,
                        description: description, 
                        image: uploadData && uploadData[0]?.image.includes('https') ? null : uploadData[0]?.image,
                        status: status
                      })
                    }}
                    />
                    <Button label={"Cancel"} functions={modalClose} classes={"main-button-alt"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col">
                  <ImageUploadPreview data={uploadData} setImage={setUploadData} label={"Upload Image"} inputRequired={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="px-2">
          <div className="row divide-x">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <Input label={"Title"} state={title} setState={setTitle} inputRequired={true} inputType={"text"} inputPlaceholder={"Example . Indian Drinks"} inputName={""} />
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <Textarea label={"Description"} state={description} setState={setDescription} inputRequired={true} inputPlaceholder={"Write description......."} inputName={""} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    <RadiosLabel setRadio={setStatus} data={publishedData} label={"Status"} inputRequired={true} />
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap gap-3">
                    <Button label={"Save"} functions={() => {submitCategory.mutate({
                        title: title,
                        description: description, 
                        image: uploadData[0]?.image ? uploadData[0].image : null,
                        status: status
                      })
                    }}
                    />
                    <Button label={"Cancel"} functions={modalClose} classes={"main-button-alt"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col">
                  <ImageUploadPreview data={uploadData} setImage={setUploadData} label={"Upload Image"} inputRequired={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  
};

export default AddCategory;
