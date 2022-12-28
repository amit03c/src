import React, { useState } from 'react';
import Button from "../../components/Form/Button";
import Search from "../../components/Form/Search";
import RadioGroup from "../../components/Form/RadioGroup";
import MerchandiseItem from "../../components/Items/MerchandiseItem";
import Modal from "../../components/Elements/Modal";
import AddMerchandise from "../../components/Modals/AddMerchandise";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { hostUrl } from '../../config/host';
import moment from 'moment/moment';


function MerchList({
  keyword,
  categoryArray,
  spiceLevelArray,
  allergyArray,
  diet,
  stock,
  popular,
  status,
  limit,
  offset,
  setLimit,
  setOffset,
  detailsFetch,
  setEditProductId,
  setEditModal,
  setProductCount,
  query,
}) {

  function useMerchProducts() {
    return useQuery({
      queryKey: query,
      queryFn: async () => {
        const { data } = await axios.post(
          `${hostUrl}/v2/products/list`,
          {
            keyword: keyword,
            product_type: 3,
            status: status,
            limit: limit,
            offset: offset
          },
          {}
        );
        return data;
      },
      keepPreviousData: true
    });
  }

  const { status: sts, data: merch, error, isFetching } = useMerchProducts();
  // setProductCount(merch ? merch.count : 0)
  if (isFetching) {
    return <div>Loading 🫠</div>;
  }

  if (error) {
    return <div>Something went wrong 🫥</div>;
  } else if (merch?.data.length === 0) {
    return <div>No data 😐</div>;
  } else {
    return (
      <>
        {merch.data.map((item) => (
          <MerchandiseItem
            key={item._id}
            productId={item._id}
            name={item.title}
            image={item.image}
            points={item.points}
            stock={item.in_stock}
            createdBy={item.created_by_name?.name}
            createdDate={moment(new Date(item.created_at)).format("Do MMM YY")}
            updatedDate={moment(new Date(item.updated_at)).format("Do MMM YY")}
            status={item.status}
          />
        ))}

        <button onClick={() => setOffset(old => Math.max(old - limit, 0))} disabled={offset === 0}>Prev</button>
        <span>{(offset/ 10)+1}</span>
        <button onClick={() => setOffset(old => Math.max(old + limit, 0))} disabled={(offset / 10) >= Math.floor(merch.count / 10)}>Next</button>
      </>
    )
  }
}


const Merchandise = () => {
  const queryClient = useQueryClient();
  
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
  
    const [editId, setEditId] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);

  const queryMerch = [
    "merchandise",
    keyword,
    status,
    limit,
    offset
  ];

  const [staticStatusArr, setStaticStatusArr] = useState([
    {_id:"", name:'All', color:'success', current:true},
    {_id:1, name:'Published', color:'success', current:false},
    {_id:3, name:'Draft', color:'warning', current:false},
  ]);

  const menuData = [
    {
      _id:1, 
      name:'T-Shirt',
      image:'images/merchandise.png', 
      points:230,
      stock:[
        {_id:'stock1', name:'In stock', color:'success', current:true},
        {_id:'stock2', name:'Out of stock', color:'danger', current:false},
      ],
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    {
      _id:2, 
      name:'Roundneck T-Shirt',
      image:'images/merchandise.png', 
      points:230,
      stock:[
        {_id:'stock1', name:'In stock', color:'success', current:true},
        {_id:'stock2', name:'Out of stock', color:'danger', current:false},
      ],
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    {
      _id:3, 
      name:'Polo T-Shirt',
      image:'images/merchandise.png', 
      points:230,
      stock:[
        {_id:'stock1', name:'In stock', color:'success', current:true},
        {_id:'stock2', name:'Out of stock', color:'danger', current:false},
      ],
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
  ]

  const addModal = () => {
    setIsAddModal(true);
  }

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search placeholder={'Search...'} state={keyword} setState={setKeyword}/>
          </div>
          <div className="input-items items-end gap-3 ms-auto">
            <Button classes={'px-2'} icon={'fa-regular fa-arrow-rotate-right'} iconPosition={'left'}/>
            <Button label={'Add Merchandise'} icon={'fa-regular fa-plus'} iconPosition={'left'} functions={addModal}/>
          </div>
        </div>
        <div className="input-items">
            <RadioGroup setData={setStatus} data={staticStatusArr} inputName={'status'}/>
          </div>
      </div>
      <div className="merchandise-list">
      <MerchList
        keyword={keyword}
        status={status}
        limit={limit}
        offset={offset}
        query={queryMerch}
      />
        {/* {menuData.map((item) => (
          <MerchandiseItem
            key={item._id}
            productId={item._id}
            name={item.name}
            image={item.image}
            points={item.points}
            stock={item.stock}
            createdBy={item.createdBy}
            createdDate={item.createdDate}
            updatedDate={item.updatedDate}
            status={item.status}
          />
        ))} */}
      </div>
      <Modal title={'Add Merchandise Products'} size={'lg'} isOpen={isAddModal} modalClose={() => setIsAddModal(!isAddModal)}>
        <AddMerchandise/>
      </Modal>
    </>
  );
};

export default Merchandise;