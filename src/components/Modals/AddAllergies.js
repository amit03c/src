import { useState } from "react";
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import ImageUploadPreview from "../Form/ImageUploadPreview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



const AddAllergies = ({ modalClose, details, isFetching }) => {
  const queryClient = useQueryClient();
  const [publishedData, setPublishedData] = useState([
    { _id: true, label: "Published", inputName: "publish_status", current: true },
    { _id: false, label: "Draft", inputName: "publish_status", current: false },
  ]);
  const [status, setStatus] = useState(true)
  const [title, setTitle] = useState("");
  const [uploadData, setUploadData] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };

  const submitAllergy = useMutation(
    (newProduct) =>
      axios
        .post(
          `https://dabbawalaapi.iosx.in:3091/api/product_ingredients/create`,
          newProduct,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries([
            "ingredients",
            "",
            "",
            "",
            "",
          ]);
          queryClient.removeQueries({
            queryKey: ["ingredients"],
            type: "inactive",
          });
          setTitle("");
          setUploadData([]);
          setStatus(1);
          modalClose();
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  return (
    <>
      <div className="px-2">
        <div className="row divide-x">
          <div className="col-lg-7">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <Input
                    state={title}
                    setState={setTitle}
                    label={"Title"}
                    inputRequired={true}
                    inputType={"text"}
                    inputPlaceholder={"Example . Wheat"}
                    inputName={""}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <RadiosLabel
                   setRadio={setStatus}
                    data={publishedData}
                    label={"Status"}
                    inputRequired={true}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex flex-wrap gap-3">
                  <Button label={"Save"} 
                  functions={() =>submitAllergy.mutate({
                    type: 1,
                    title: title,
                    status: status,
                    image: uploadData ? uploadData[0]?.image : null,
                  })}
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
                  setImage={setUploadData}
                  data={uploadData}
                  label={"Upload Image"}
                  inputRequired={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAllergies;
