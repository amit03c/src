import { useState } from "react";
import Search from "../../components/Form/Search";
import AllergiesItem from "../../components/Items/AllergiesItem";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import AddAllergies from "../../components/Modals/AddAllergies";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import RadioGroup from "../../components/Form/RadioGroup";

const Allergy = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("");
  const [statusStatic, setStatusStatic] = useState([
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ]);
  function Allergies({
    keyword,
    limit,
    offset,
    queryData,
    setLimit,
    setOffset,
  }) {
    function useAllergy() {
      return useQuery({
        // queryKey: ["alergies"],
        queryKey: queryData,
        queryFn: async () => {
          const { data } = await axios.post(
            "https://dabbawalaapi.iosx.in:3091/api/product_ingredients/list",
            {
              keyword: keyword,
              type: 1,
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

    const { data: allergies, error, isFetching } = useAllergy();
    if (isFetching) {
      return <div>Loading 🫠</div>;
    }

    if (error) {
      return <div>Something went wrong 🫥</div>;
    } else if (allergies.data.length === 0) {
      return <div>No data 😐</div>;
    } else {
      return (
        <>
          {allergies &&
            allergies.data.length > 0 &&
            allergies.data.map((item) => (
              <AllergiesItem
                key={item?._id}
                AllergiesId={item._id}
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
                queryKeyProduct={queryData}
                status={item?.status}
              />
            ))}
          <button
            onClick={() => setOffset((old) => Math.max(old - limit, 0))}
            disabled={offset === 0}
          >
            Prev
          </button>
          <span>{offset / 10 + 1}Current</span>
          <button
            onClick={() => setOffset((old) => Math.max(old + limit, 0))}
            disabled={offset / 10 >= Math.floor(allergies.count / 10)}
          >
            Next
          </button>
        </>
      );
    }
  }

  const addModal = () => {
    setIsAddModal(true);
  };

  const queryData = ["ingredients", keyword, limit, offset, status];

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters d-flex justify-content-between">
          <div className="input-items">
            <Search
              state={keyword}
              setState={setKeyword}
              placeholder={"Search..."}
            />
          </div>

          <div className="input-items items-end gap-3 ms-auto">
            <Button
              label={""}
              labelClasses={""}
              classes={"px-2"}
              icon={"fa-regular fa-arrow-rotate-right"}
              iconPosition={"left"}
              functions={() => {
                setOffset(0);
                setKeyword("");
                setStatus("");
                setStatusStatic([]);
                setTimeout(() => {
                  setStatusStatic([
                    { _id: 1, name: "All", color: "success", current: true },
                    {
                      _id: 2,
                      name: "Published",
                      color: "success",
                      current: false,
                    },
                    { _id: 3, name: "Draft", color: "warning", current: false },
                  ]);
                }, 1000);
              }}
            />
            <Button
              label={"Add Allergies"}
              labelClasses={""}
              classes={""}
              icon={"fa-regular fa-plus"}
              iconPosition={"left"}
              functions={addModal}
            />
          </div>
        </div>
        <div className="radio-filters">
          <RadioGroup
            data={statusStatic}
            // setData={setStatus}
            inputName={"status"}
          />
        </div>
      </div>

      <div className="allergies-list">
        <Allergies
          queryData={queryData}
          keyword={keyword}
          limit={limit}
          offset={offset}
          setLimit={setLimit}
          setOffset={setOffset}
          status={status}
        />
      </div>

      <Modal
        title={"Add Allergies"}
        size={"md"}
        isOpen={isAddModal}
        modalClose={() => setIsAddModal(!isAddModal)}
      >
        <AddAllergies />
      </Modal>
    </>
  );
};

export default Allergy;
