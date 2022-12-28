import React, { useState } from "react";
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import SelectTag from "../Form/SelectTag";
import Textarea from "../Form/Textarea";
const AddFaqs = () => {
  const publishedData = [
    { _id: 1, label: "Published", inputName: "publish_status", current: true },
    { _id: 2, label: "Draft", inputName: "publish_status", current: false },
  ];

  const demoOptionsData = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
    { value: 4, label: "Option 4" },
    { value: 5, label: "Option 5" },
    { value: 6, label: "Option 6" },
    { value: 7, label: "Option 7" },
    { value: 8, label: "Option 8" },
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
    { value: 4, label: "Option 4" },
    { value: 5, label: "Option 5" },
    { value: 6, label: "Option 6" },
    { value: 7, label: "Option 7" },
    { value: 8, label: "Option 8" },
  ];

  return (
    <>
      <div className="px-2">
        <div className="row divide-x">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <Input label={"Qusetion"} inputRequired={true} inputType={"text"} inputPlaceholder={"Example . Veg"} inputName={""} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-4">
                  <SelectTag data={demoOptionsData} placeholder={"Example: Food"} label={"Select Category"} inputRequired={false} checkboxPosition={"right"} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <Textarea label={"Answer"} inputRequired={true} inputPlaceholder={"Write Answer......."} inputName={""} />
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

export default AddFaqs;
