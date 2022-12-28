import React, { useState } from "react";
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import Textarea from "../Form/Textarea";

const AddAuthors = () => {

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
                  <Input label={"Author Name"} inputRequired={true} inputType={"text"} inputPlaceholder={"Example . Veg"} inputName={""} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <Textarea 
                    label={'Description'}
                    inputRequired={true}
                    inputPlaceholder={'Write description.......'}
                    inputName={''}
                  />
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

export default AddAuthors;
