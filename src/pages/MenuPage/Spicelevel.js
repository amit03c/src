import { useState } from "react";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import SpieceLevelItem from "../../components/Items/SpiceLevelItem";
import AddSpiceLevel from "../../components/Modals/AddSpiceLevel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

const Spiecelevel = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  function Spices({ keyword, limit, offset }) {
    function useSpice() {
      return useQuery({
        queryKey: ["spices"],
        queryFn: async () => {
          const { data } = await axios.post(
            "https://dabbawalaapi.iosx.in:3091/api/product_ingredients/list",
            {
              keyword: keyword,
              type: 2,
              status: true,
              limit: limit,
              offset: offset,
            },
            {}
          );
          return data;
        },
      });
    }

    const { data: spices, error, isFetching } = useSpice();
    
    if (isFetching) {
      return <div>Loading 🫠</div>;
    }

    if (error) {
      return <div>Something went wrong 🫥</div>;
    } else if (spices.data.length === 0) {
      return <div>No data 😐</div>;
    } else {
      return (
        <>
          {spices &&
            spices.data.length > 0 &&
            spices.data.map((item) => (
              <SpieceLevelItem
                key={item?._id}
                image={item?.image}
                name={item?.title}
                descriptions={item?.description}
                addons={item?.addons}
                createdDate={moment(new Date(item?.created_at)).format(
                  "Do MMM YY"
                )}
                updatedDate={moment(new Date(item?.updated_at)).format(
                  "Do MMM YY"
                )}
                status={item?.status}
              />
            ))}
        </>
      );
    }
  }

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
            />
            <Button
              label={"Add Spice Level"}
              labelClasses={""}
              classes={""}
              icon={"fa-regular fa-plus"}
              iconPosition={"left"}
              functions={addModal}
            />
          </div>
        </div>
        <div className="radio-filters">
          <RadioGroup data={status} inputName={"status"} />
        </div>
      </div>

      <div className="spice-level-list">
        <Spices/>
      </div>

      <Modal
        title={"Add Spiece Level"}
        size={"md"}
        isOpen={isAddModal}
        modalClose={() => setIsAddModal(!isAddModal)}
      >
        <AddSpiceLevel />
      </Modal>
    </>
  );
};

export default Spiecelevel;
