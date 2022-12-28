import React, { useEffect, useState } from "react";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import {setTitle} from '../../helpers/MetaTag';
import Confirm from "../../components/Elements/Confirm";
import AddTakeOffTime from "../../components/Modals/AddTakeOffTime";
import TakeOffTimeItem from "../../components/Items/TakeOffTimeItem";

const TakeOffTime = () => {
  setTitle('Dabbawala | Take Off Time');

  const status = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ];

  const takeoffData = [
    {
      _id: 1,
      image: "../images/icon-3.png",
      name: "03:25 PM",
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      status: 1, // 1 = Published, 2 = Drafts
    },
    {
      _id: 2,
      image: "../images/icon-5.png",
      name: "02:36 PM",
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      status: 1, // 1 = Published, 2 = Drafts
    },
  ];

  const [isAddModal, setIsAddModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const addModal = () => {
    setIsAddModal(true);
  };
  const deleteItem = () => {
    setIsOpenConfirm(true);
  }
  return (
    <>
      <div className="page-content">
        <div className="page-filter mb-3">
          <div className="input-filters d-flex justify-content-between">
            <div className="input-items">
              <Search placeholder={"Search..."} />
            </div>

            <div className="input-items items-end gap-3 ms-auto">
              <Button label={""} labelClasses={""} classes={"px-2"} icon={"fa-regular fa-arrow-rotate-right"} iconPosition={"left"} functions={deleteItem}/>
              <Button label={"Add Take Off Time"} labelClasses={""} classes={""} icon={"fa-regular fa-plus"} iconPosition={"left"} functions={addModal} />
            </div>
          </div>
          <div className="radio-filters">
            <RadioGroup data={status} inputName={"status"} />
          </div>
        </div>
        <div className="take-off-list">
          {takeoffData.map((item) => (
            <TakeOffTimeItem
              key={item._id}
              name={item.name}
              createdBy={item.createdBy}
              createdDate={item.createdDate}
              updatedDate={item.updatedDate}
              status={item.status}
            />
          ))}
        </div>
      </div>
      <Modal title={"Add Take Off Time"} size={"sm"} isOpen={isAddModal} modalClose={() => setIsAddModal(!isAddModal)}>
        <AddTakeOffTime />
      </Modal>

      <Confirm
        icon={'fa-regular fa-xmark'}
        iconColorClass={'bg-danger'}
        title={'Delete'}
        text={'Are you really want to delete item?'}
        isOpen={isOpenConfirm}
        confirmClose={() => setIsOpenConfirm(false)}
      />
    </>
  );
};

export default TakeOffTime;
