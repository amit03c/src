import React, { useState } from "react";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import AddFood from "../../components/Modals/AddFood";
import CommentItem from "../../components/Items/CommentItem";

const CommentsList = () => {
  const [isAddModal, setIsAddModal] = useState(false);

  const commentData = [
    {
      _id:1, 
      name:'Food',
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      authorName:'John Doe',
      authorEmail:'youremail@gmail.com',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    
  ];



  const status = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ];

  const addModal = () => {
    setIsAddModal(true);
  };

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search placeholder={"Search..."} />
          </div>

          {/* <div className="input-items items-end ms-auto gap-3">
            <Button classes={"px-2"} icon={"fa-regular fa-arrow-rotate-right"} iconPosition={"left"} />
            <Button label={"Add Blog"} labelClasses={""} classes={""} icon={"fa-regular fa-plus"} iconPosition={"left"} functions={addModal} />
          </div> */}
        </div>
        <div className="radio-filters">
          <RadioGroup data={status} inputName={"status"} />
        </div>
      </div>
      <div className="comment-list">
        {commentData.map((item) => (
          <CommentItem
            key={item._id}
            name={item.name}
            description={item.description}
            authorName={item.authorName}
            authorEmail={item.authorEmail}
            createdBy={item.createdBy}
            createdDate={item.createdDate}
            updatedDate={item.updatedDate}
            status={item.status}
          />
        ))}
      </div>
      <Modal title={"Add Food"} size={"xl"} isOpen={isAddModal} modalClose={() => setIsAddModal(!isAddModal)}>
        <AddFood />
      </Modal>
    </>
  );
};

export default CommentsList;
