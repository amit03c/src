import React from 'react';
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import ImageUploadPreview from "../Form/ImageUploadPreview";

const AddMerchandise = () => {

  const stockManageData = [
    {_id:1, label:'In Stock', inputName:'stockManage', current:true },
    {_id:2, label:'Sold out for today', inputName:'stockManage', current:false },
    {_id:3, label:'Out of stock', inputName:'stockManage', current:false },
  ]

  const uploadData = [
    {_id:1, image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'},
  ]

  const publishedData = [
    {_id:1, label:'Published', inputName:'publish_status', current:true },
    {_id:2, label:'Draft', inputName:'publish_status', current:false },
  ]
  
  return (
    <>
      <div className="px-2">
        <div className="row divide-x">
          <div className="col-lg-8">

            <div className="row">
              <div className="col-md-7">
                <div className="mb-3">
                  <Input 
                    label={'Product Name'}
                    inputRequired={true}
                    inputType={'text'}
                    inputPlaceholder={'Example . Pizza'}
                    inputName={''}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="mb-3">
                  <Input 
                    label={'PLU Code'}
                    inputRequired={true}
                    inputType={'text'}
                    inputPlaceholder={'1667303409038'}
                    inputName={''}
                    labelButtonName={'Generate'}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <Input 
                    label={'Point Price'}
                    inputRequired={true}
                    inputType={'number'}
                    inputPlaceholder={'€ 250'}
                    inputName={''}
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="mb-4">
                  <RadiosLabel data={stockManageData} label={'Stock Manage'} inputRequired={true}/>
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
                  <RadiosLabel data={publishedData} label={'Status'} inputRequired={true}/>
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
          <div className="col-lg-4">

            <div className="row">
              <div className="col">
                <ImageUploadPreview data={uploadData} label={'Upload Image'} inputRequired={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMerchandise;