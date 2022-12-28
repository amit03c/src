import React, { useState } from 'react';
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";

const AddCoupon = () => {

  const publishedData = [
    {_id:1, label:'Published', inputName:'publish_status', current:true },
    {_id:2, label:'Draft', inputName:'publish_status', current:false },
  ]

  return (
    <>
      <div className="px-2">
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <Input 
                label={'User ID'}
                inputRequired={true}
                inputType={'text'}
                inputPlaceholder={'User ID'}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <Input 
                label={'Coupon Code'}
                inputRequired={true}
                inputType={'text'}
                inputPlaceholder={'Coupon Code'}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-3">
              <Input 
                label={'Discount Type'}
                inputRequired={true}
                inputType={'text'}
                inputPlaceholder={'€ or %'}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="mb-3">
              <Input 
                label={'Amount'}
                inputRequired={true}
                inputType={'number'}
                inputPlaceholder={'€ 150'}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <Input 
                label={'Min Spent Amount'}
                inputRequired={true}
                inputType={'number'}
                inputPlaceholder={''}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <Input 
                label={'Max Spent Amount'}
                inputRequired={true}
                inputType={'number'}
                inputPlaceholder={''}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <Input 
                label={'Limit'}
                inputRequired={true}
                inputType={'number'}
                inputPlaceholder={''}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <Input 
                label={'Valid From'}
                inputRequired={true}
                inputType={'date'}
                inputPlaceholder={''}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <Input 
                label={'Valid Through'}
                inputRequired={true}
                inputType={'date'}
                inputPlaceholder={''}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <Textarea 
                label={'Coupon Description'}
                inputRequired={true}
                inputPlaceholder={'Write description.......'}
                inputName={''}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-4">
              <RadiosLabel data={publishedData} label={'Status'} inputRequired={true}/>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-wrap gap-3">
              <Button label={'Save'}/>
              <Button label={'Cancel'} classes={'main-button-alt'}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;