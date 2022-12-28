import React, { useState } from 'react';
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import CouponItem from "../../components/Items/CouponItem";
import AddCoupon from "../../components/Modals/AddCoupon";

const Coupon = () => {

  const [isAddModal, setIsAddModal] = useState(false);

  const couponData = [
    {
      _id:1, 
      name:'F0BCA99FB3',
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      validFrom:'15 Oct 2022',
      validThrough:'15 Oct 2023',
      limit:'1',
      minSpent:'€100',
      maxSpent:'€1000',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
      price:'€20',
    },
    {
      _id:2, 
      name:'F0BCA99FB3',
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      validFrom:'15 Oct 2022',
      validThrough:'15 Oct 2023',
      limit:'1',
      minSpent:'€100',
      maxSpent:'€1000',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
      price:'€20',
    }
  ]

  const addModal = () => {
    setIsAddModal(true);
  }

  const status = [
    {_id:1, name:'All', color:'success', current:true},
    {_id:2, name:'Published', color:'success', current:false},
    {_id:3, name:'Draft', color:'warning', current:false},
  ]

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search placeholder={'Search...'}/>
          </div>
         
          <div className="input-items items-end gap-3 ms-auto">
            <Button classes={'px-2'} icon={'fa-regular fa-arrow-rotate-right'} iconPosition={'left'}/>
            <Button label={'Add Coupon'} icon={'fa-regular fa-plus'} iconPosition={'left'} functions={addModal}/>
          </div>
        </div>
        <div className="input-items">
            <RadioGroup data={status} inputName={'status'}/>
          </div>
      </div>
      <div className="coupon-list">
        {couponData.map((item) => (
          <CouponItem
            key={item._id}
            name={item.name}
            description={item.description}
            validFrom={item.validFrom}
            validThrough={item.validThrough}
            limit={item.limit}
            minSpent={item.minSpent}
            maxSpent={item.maxSpent}
            createdBy={item.createdBy}
            createdDate={item.createdDate}
            status={item.status}
            price={item.price}
          />
        ))}
      </div>
      <Modal title={'Create Coupon'} size={'sm'} isOpen={isAddModal} modalClose={() => setIsAddModal(!isAddModal)}>
        <AddCoupon/>
      </Modal>
    </>
  );
};

export default Coupon;