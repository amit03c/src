import React, { useState } from "react";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import Button from "../../components/Form/Button";
import SelectTag from "../../components/Form/SelectTag";
import FaqFeedbackItem from "../../components/Items/FaqFeedbackItem";

const FaqFeedback = () => {
  const feedbackData = [
    {
      _id:1, 
      name:'How to sign up',
      ipAddress:'31.201.219.198',
      authorName:'John Doe',
      user:'Rohon Nag',
      userEmail:'rohon@mailinator.com',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    {
      _id:2, 
      name:'How to sign up',
      ipAddress:'31.201.219.198',
      authorName:'John Doe',
      user:'Rohon Nag',
      userEmail:'rohon@mailinator.com',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    
  ];

  const categoryDropdown = [
    {value:1, label:'Category 1',},
    {value:2, label:'Category 2',},
    {value:3, label:'Category 3',},
    {value:4, label:'Category 4',},
    {value:5, label:'Category 5',},
    {value:6, label:'Category 6',},
    {value:7, label:'Category 7',},
    {value:8, label:'Category 8',},
  ]

  const status = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ];

 

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search placeholder={"Search..."} />
          </div>
          <div className="input-items">
            <SelectTag data={categoryDropdown} placeholder={'Category'}/>
          </div>
          <div className="input-items items-end ms-auto gap-3">
            <Button classes={"px-2"} icon={"fa-regular fa-arrow-rotate-right"} iconPosition={"left"} />
            {/* <Button label={"Add Blog"} labelClasses={""} classes={""} icon={"fa-regular fa-plus"} iconPosition={"left"} functions={addModal} /> */}
          </div>
        </div>
        <div className="radio-filters">
          <RadioGroup data={status} inputName={"status"} />
        </div>
      </div>
      <div className="blogs-list">
        {feedbackData.map((item) => (
          <FaqFeedbackItem
            key={item._id}
            name={item.name}
            ipAddress={item.ipAddress}
            user={item.user}
            userEmail={item.userEmail}
            createdBy={item.createdBy}
            createdDate={item.createdDate}
            updatedDate={item.updatedDate}
            status={item.status}
          />
        ))}
      </div>
      
    </>
  );
};

export default FaqFeedback;
