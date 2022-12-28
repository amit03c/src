import React, { useEffect, useState } from 'react';
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import CategoryItems from "../../components/Items/CategoryItems";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import AddCategory from "../../components/Modals/AddCategory";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { hostUrl } from '../../config/host';
import moment from 'moment/moment';



function Category({
  keyword,
  status,
  limit,
  offset,
  setOffset,
  detailsFetch,
  setEditCategoryId,
  setEditModal,
  setProductCount,
  queryCategory,
}) {

function useCategories() {
  return useQuery({
    queryKey: queryCategory,
    queryFn: async () => {
      const { data } = await axios.post(
        `${hostUrl}/product_categories/list`,
        {
          keyword: keyword,
          limit: limit,
          status: status,
          offset: offset
        },
        {}
      );
      return data;
    },
    keepPreviousData: true
  });
}
const { status: sts, data: categories, error, isFetching } = useCategories();

console.log(categories?.count);

if (isFetching) {
  return <div>Loading 🫠</div>;
}

if (error) {
  return <div>Something went wrong 🫥</div>;
} else if (categories.data.length === 0) {
  return <div>No data 😐</div>;
} else {
  return(
    <>
    {categories.data.map((item) => (
      <CategoryItems
        key={item._id}
        categoryId={item._id}
        image={item.image}
        name={item.title}
        descriptions={item.description}
        createdDate={moment(new Date(item.created_at)).format("Do MMM YY")}
        status={item.status}
        queryCategory={queryCategory}
        detailsFetch={detailsFetch}
        setEditModal={setEditModal}
        setEditId={setEditCategoryId}
      />
    ))}
    
    <button onClick={() => setOffset(old => Math.max(old - limit, 0))} disabled={offset === 0}>Prev</button>
        <span>{(offset/ 10)+1}</span>
        <button onClick={() => setOffset(old => Math.max(old + limit, 0))} disabled={(offset / 10) >= Math.floor(categories.count / 10)}>Next</button>
    </>
    
  )
}
}


const Categories = () => {
  const queryClient = useQueryClient();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [editId, setEditId] = useState("");
  console.log(editId);

  const queryCategory = [
    "categories",
    keyword,
    status,
    limit,
    offset
  ];

  const [statusStaticArr, setStatusStaicArr] = useState([
    { _id: "", name: 'All', color: 'success', current: true },
    { _id: true, name: 'Published', color: 'success', current: false },
    { _id: false, name: 'Draft', color: 'warning', current: false },
  ]);

  const categoryData = [
    {
      _id:1, 
      image: '../images/icon-1.svg',
      name:'Amritsari Lassi',
      descriptions:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
    {
      _id:2, 
      image: '../images/icon-2.svg',
      name:'Amritsari Lassi',
      descriptions:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      createdBy:'Admin',
      createdDate:'15 Oct 2022',
      updatedDate:'17 Oct 2022',
      status:1, // 1 = Published, 2 = Drafts
    },
   
  ]

  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const addModal = () => {
    setIsAddModal(true);
  }

  const { data: details, error, refetch, isFetching } = useQuery({
    queryKey: ["details", editId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${hostUrl}/product_categories/details`,
        {
          id: editId,
        },
        {}
      );
      return data.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (editId !== "") {
      refetch();
    }
  }, [editId, refetch]);


  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters d-flex justify-content-between">
          <div className="input-items">
            <Search placeholder={'Search...'} state={keyword} setState={setKeyword} />
          </div>

          <div className="input-items items-end gap-3 ms-auto">
            <Button label={''} labelClasses={''} classes={'px-2'} icon={'fa-regular fa-arrow-rotate-right'} iconPosition={'left'}
              functions={() => {
                queryClient.invalidateQueries(queryCategory);
                queryClient.removeQueries({
                  queryKey: ["categories"],
                  type: "inactive",
                });
              }
              }
            />
            <Button label={'Add Category'} labelClasses={''} classes={''} icon={'fa-regular fa-plus'} iconPosition={'left'} functions={addModal} />

          </div>

        </div>
        <div className="radio-filters">
          <RadioGroup data={statusStaticArr} setData={setStatus} inputName={'status'} />
        </div>
      </div>

      <div className='category-list'>
        <Category
          keyword={keyword}
          limit={limit}
          status={status}
          queryCategory={queryCategory}
          offset={offset}
          setLimit={setLimit}
          setOffset={setOffset}
          detailsFetch={refetch}
          setEditModal={setIsEditModal}
          setEditCategoryId={setEditId}
        />
      </div>

      <Modal title={'Add Category'} size={'md'} isOpen={isAddModal} modalClose={() => setIsAddModal(!isAddModal)}>
        <AddCategory modalClose={() => setIsAddModal(!isAddModal)} queryCategory={queryCategory}/>
      </Modal>
      <Modal
        title={"Edit Category"}
        size={"xl"}
        isOpen={isEditModal}
        modalClose={() => setIsEditModal(false)}
      >
        <AddCategory details={details} isFetching={isFetching} queryCategory={queryCategory} modalClose={() => setIsEditModal(false)} />
      </Modal>
    </>
  );
};

export default Categories;