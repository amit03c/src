import React, { useState } from "react";
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";

const AddTakeOffTime = () => {
  const uploadData = [
    { _id: 1, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" },
  ];
  const publishedData = [
    { _id: 1, label: "Published", inputName: "publish_status", current: true },
    { _id: 2, label: "Draft", inputName: "publish_status", current: false },
  ];

  return (
    <>
      <div className="px-2">
        <div className="row divide-x">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <Input label={"Title"} inputRequired={true} inputType={"text"} inputPlaceholder={"Example . Veg"} inputName={""} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <RadiosLabel data={publishedData} label={"Status"} inputRequired={true} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex flex-wrap gap-3">
                  <Button label={"Save"} />
                  <Button label={"Cancel"} classes={"main-button-alt"} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AddTakeOffTime;