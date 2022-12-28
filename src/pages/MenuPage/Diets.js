import { useEffect, useState } from "react";

import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import DietItem from "../../components/Items/DietItem";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import AddDiets from "../../components/Modals/AddDiets";

import { dietsApiData } from "../../services/api";

const Diets = () => {

  const [redioData,setRedioData]=useState();
 
  const queryClient = useQueryClient()

  
  const getIngredientsList=() =>
  
  dietsApiData("POST","/product_ingredients/list",
  {
    keyword: "",
    sortByField: "ordering",
    sortByValue: 1,
    limit: 10,
    offset: 0,
    type: 3,
    status:redioData===1?"" :redioData===2?true : redioData===3?false :"",
    dateRange: {
      start: "",
      end: "",
    }
  }
  ).then((res) => {
        if (res.data.data) {
          return res.data.data;
        } else {
          return [];
        }
      })

  const { isLoading, error, data } = useQuery(['todo',redioData],getIngredientsList
  )
  
 
  const mutation=useMutation({
    mutationFn:getIngredientsList,
    onSuccess:(data)=>{
      queryClient.setQueryData(['todo',redioData],data)
    }
  })

  

  const status = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ];

  const dietsData = [
    {
      _id: 1,
      image: "../images/veg.svg",
      name: "Veg",
      descriptions:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      status: 1, // 1 = Published, 2 = Drafts
    },
    {
      _id: 2,
      image: "../images/non-veg.svg",
      name: "Non-veg",
      descriptions:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      status: 1, // 1 = Published, 2 = Drafts
    },
  ];

  const successFullPost=(status=false)=>{
   if(status===true){
    mutation.mutate()
   }

  }

  const [isAddModal, setIsAddModal] = useState(false);


  const addModal = () => {
    setIsAddModal(true);

  };
  
  
  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters d-flex justify-content-between">
          <div className="input-items">
            <Search placeholder={"Search..."} />
          </div>

          <div className="input-items items-end gap-3 ms-auto">
            <Button
              label={""}
              labelClasses={""}
              classes={"px-2"}
              icon={"fa-regular fa-arrow-rotate-right"}
              iconPosition={"left"}
              functions={()=>{
                mutation.mutate()

              }}

            />
            <Button
              label={"Add Diets"}
              labelClasses={""}
              classes={""}
              icon={"fa-regular fa-plus"}
              iconPosition={"left"}
              functions={addModal}

              

            />
          </div>
        </div>
        <div className="radio-filters">
          <RadioGroup data={status} inputName={"status"}  setData={setRedioData}  />
        </div>
      </div>

      <div className="diets-list">
        {Array.isArray(data) &&
          !isLoading &&
          data.map((item) => (
            <DietItem
              key={item._id}
              image={item.image}
              name={item.title}
              descriptions={item.descriptions}
              addons={item.addons}
              createdBy={item.createdBy}
              createdDate={item.created_at}
              updatedDate={item.updated_at}
              status={item.status===true?1:false}
            />
          ))}
      </div>

      <Modal
        title={"Add Diets"}
        size={"md"}
        isOpen={isAddModal}
        modalClose={() => setIsAddModal(!isAddModal)}>

        <AddDiets setState={setIsAddModal} isSuccess={successFullPost}
        />

      </Modal>
    </>
  );
};

export default Diets;
