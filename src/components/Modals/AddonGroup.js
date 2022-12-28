import React, { useState } from 'react';
import Input from "../Form/Input";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import SelectTag from "../Form/SelectTag";

const AddonGroup = ({isOpen, setIsOpen}) => {

  const demoOptionsData = [
    {value:1, label:'Option 1',},
    {value:2, label:'Option 2',},
    {value:3, label:'Option 3',},
    {value:4, label:'Option 4',},
    {value:5, label:'Option 5',},
    {value:6, label:'Option 6',},
    {value:7, label:'Option 7',},
    {value:8, label:'Option 8',},
    {value:1, label:'Option 1',},
    {value:2, label:'Option 2',},
    {value:3, label:'Option 3',},
    {value:4, label:'Option 4',},
    {value:5, label:'Option 5',},
    {value:6, label:'Option 6',},
    {value:7, label:'Option 7',},
    {value:8, label:'Option 8',},
  ]

  const publishedData = [
    {_id:1, label:'Published', inputName:'publish_status', current:true },
    {_id:2, label:'Draft', inputName:'publish_status', current:false },
  ]

  const addAddons = () => {
    setIsOpen(!isOpen);
  }

  const modificationData = [
    {_id:1, name:'Chicken Tikka', },
    {_id:2, name:'Chicken Biriyani',},
    {_id:3, name:'Chili Chicken',},
  ]

  return (
    <>
      <div className="px-2">
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <Input 
                label={'Name'}
                inputRequired={true}
                inputType={'text'}
                inputPlaceholder={'Example: Drinks'}
                inputName={''}
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <Input 
                    label={'Min'}
                    inputRequired={true}
                    inputType={'text'}
                    inputPlaceholder={'Min quantity'}
                    inputName={''}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <Input 
                    label={'Max'}
                    inputRequired={true}
                    inputType={'text'}
                    inputPlaceholder={'Max quantity'}
                    inputName={''}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <SelectTag 
                data={demoOptionsData}
                placeholder={'Example: Categories'}
                label={'Category'}
                inputRequired={true}
                isCheckbox={false}
              />
            </div>
            <div className="mb-3">
              <SelectTag 
                data={demoOptionsData}
                placeholder={'Example: Biriyani, Chicken'}
                label={'Product'}
                inputRequired={true}
                isCheckbox={false}
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
          <div className="col-12">
            <div className="modification">
              <Button label={'New Modification'} classes={'main-button-link text-color-02'} functions={addAddons}/>
              <div className="modification-list">
                {modificationData.map((item) => (
                <div className="item" key={item._id}>
                  <div className="item-title">{item.name}</div>
                  <div className="item-action">
                    <Button classes={'main-button-icon-sm text-shades-05'} icon={'fa-regular fa-pen-to-square'} iconPosition={'left'}/>
                    <Button classes={'main-button-icon-sm text-color-02'} icon={'fa-regular fa-trash-can'} iconPosition={'left'} />
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
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

export default AddonGroup;