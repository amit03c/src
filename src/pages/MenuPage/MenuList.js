import { useEffect, useState } from "react";
import RadioGroup from "../../components/Form/RadioGroup";
import Search from "../../components/Form/Search";
import SelectTag from "../../components/Form/SelectTag";
import Button from "../../components/Form/Button";
import Modal from "../../components/Elements/Modal";
import AddFood from "../../components/Modals/AddFood";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MenuItems from "../../components/Items/MenuItem";
import moment from "moment/moment";
import { hostUrl } from "../../config/host";

// Product Items Component
function Product({
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
  queryProduct,
}) {
  function useProducts() {
    return useQuery({
      queryKey: queryProduct,
      queryFn: async () => {
        const { data } = await axios.post(
          `${hostUrl}/v2/products/list`,
          {
            keyword: keyword,
            product_type: 1,
            product_category_id: categoryArray,
            status: status,
            spice_level_id: spiceLevelArray,
            allergie_id: allergyArray,
            in_stock: stock,
            diet_id: diet,
            featured: popular,
            addon_id: [],
            limit: limit,
            offset: offset,
          },
          {}
        );
        return data;
      },
      keepPreviousData: true,
    });
  }

  const { status: sts, data: products, error, isFetching } = useProducts();
  setProductCount(products ? products.count : 0);
  if (isFetching) {
    return <div>Loading 🫠</div>;
  }

  if (error) {
    return <div>Something went wrong 🫥</div>;
  } else if (products.data.length === 0) {
    return <div>No data 😐</div>;
  } else {
    return (
      <>
        {products.data.map((item) => (
          <MenuItems
            key={item._id}
            productId={item._id}
            name={item.title}
            type={item?.diet_list?.title}
            category={item.category_list}
            isPopular={item.featured}
            points={item.price_point}
            spiceLevel={item.spice_level_list}
            allergies={item.allergie_list}
            addons={item.addon_list}
            stock={item.in_stock}
            createdBy={item?.created_by_name?.name}
            createdDate={moment(new Date(item.created_at)).format("Do MMM YY")}
            updatedDate={moment(new Date(item.updated_at)).format("Do MMM YY")}
            plu_code={item.plu_code}
            status={item.status}
            price={item.regular_price}
            discountPercentage={item.sale_price}
            queryKeyProduct={queryProduct}
            detailsFetch={detailsFetch}
            setEditProductId={setEditProductId}
            setEditModal={setEditModal}
          />
        ))}

        <button onClick={() => setOffset(old => Math.max(old - limit, 0))} disabled={offset === 0}>Prev</button>
        <span>{(offset/ 10)+1}</span>
        <button onClick={() => setOffset(old => Math.max(old + limit, 0))} disabled={(offset / 10) >= Math.floor(products.count / 10)}>Next</button>

      </>
    );
  }
}

// Component for Product Category Dropdown
function Category({ selectedCatOpt, setSelectedCatOpt, setCatArr }) {
  function useCategory() {
    return useQuery({
      queryKey: ["categories_dropdown"],
      queryFn: async () => {
        let tmp = [];
        const { data } = await axios.post(
          `${hostUrl}/product_categories/list`,
          {
            limit: 9999,
          },
          {}
        );

        data.data.forEach((item) => {
          tmp.push({ value: item._id, label: item.title });
        });

        return tmp;
      },
    });
  }

  const { data: categories } = useCategory();

  return (
    <div className="input-items">
      <SelectTag
        data={categories}
        selectedOptions={selectedCatOpt}
        setSelectedOptions={setSelectedCatOpt}
        setStateId={setCatArr}
        placeholder={"Category"}
      />
    </div>
  );
}

// Component for Spice Level Dropdown
function SpiceLvl({ selectedSpiceOpt, setSelectedSpiceOpt, setSpiceArr }) {
  function useSpice() {
    return useQuery({
      queryKey: ["spice_level_dropdown"],
      queryFn: async () => {
        let tmp = [];
        const { data } = await axios.post(
          `${hostUrl}/product_ingredients/list`,
          {
            status: true,
            type: 2,
            limit: 9999,
          },
          {}
        );

        data.data.forEach((item) => {
          tmp.push({ value: item._id, label: item.title });
        });

        return tmp;
      },
    });
  }

  const { data: spices } = useSpice();

  return (
    <div className="input-items">
      <SelectTag
        data={spices}
        selectedOptions={selectedSpiceOpt}
        setSelectedOptions={setSelectedSpiceOpt}
        setStateId={setSpiceArr}
        placeholder={"Spice Level"}
      />
    </div>
  );
}

// Component for Allergy Dropdown
function Allergy({ selectedAllergyOpt, setSelectedAllergyOpt, setAllergyArr }) {
  function useAllergy() {
    return useQuery({
      queryKey: ["allergy_dropdown"],
      queryFn: async () => {
        let tmp = [];
        const { data } = await axios.post(
          `${hostUrl}/product_ingredients/list`,
          {
            status: true,
            type: 1,
            limit: 9999,
          },
          {}
        );

        data.data.forEach((item) => {
          tmp.push({ value: item._id, label: item.title });
        });

        return tmp;
      },
    });
  }

  const { data: allergies } = useAllergy();

  return (
    <div className="input-items">
      <SelectTag
        data={allergies}
        selectedOptions={selectedAllergyOpt}
        setSelectedOptions={setSelectedAllergyOpt}
        setStateId={setAllergyArr}
        placeholder={"Allergy"}
      />
    </div>
  );
}

// Component for Diet Dropdown
function Diet({ setDiet }) {
  function useAllergy() {
    return useQuery({
      queryKey: ["diets"],
      keepPreviousData: true,
      queryFn: async () => {
        let tmp = [];
        const { data } = await axios.post(
          `${hostUrl}/product_ingredients/list`,
          {
            status: true,
            type: 3,
            limit: 9999,
          },
          {}
        );
        tmp.push({ _id: "", name: "All", color: "success", current: true });
        data.data.forEach((item) => {
          if (item.title === "Non veg") {
            tmp.push({
              _id: item._id,
              name: item.title,
              color: "danger",
              current: false,
            });
          } else {
            tmp.push({
              _id: item._id,
              name: item.title,
              color: "success",
              current: false,
            });
          }
        });

        return tmp;
      },
    });
  }

  const { data: diets } = useAllergy();

  return <RadioGroup data={diets} setData={setDiet} inputName={"type"} />;
}

// Product section component with filtering and Pagination
const MenuList = () => {
  // For filtering data
  const [keyword, setKeyword] = useState("");
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedSpice, setSelectedSpice] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState([]);
  const [diet, setDiet] = useState("");
  const [stock, setStock] = useState("");
  const [popular, setPopular] = useState("");
  const [status, setStatus] = useState("");

  // For pagination
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [productCount, setProductCount] = useState(0);

  // For selected options in dropdown
  const [selectedCatOpt, setSelectedCatOpt] = useState([]);
  const [selectedSpiceOpt, setSelectedSpiceOpt] = useState([]);
  const [selectedAllergyOpt, setSelectedAllergyOpt] = useState([]);
  const [editProductId, setEditProductId] = useState("");

  const {
    data: details,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["details", editProductId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${hostUrl}/v2/products/details`,
        {
          id: editProductId,
        },
        {}
      );
      return data.data;
    },
    enabled: false,
  });

  const queryProduct = [
    "products",
    keyword,
    selectedCat,
    selectedSpice,
    selectedAllergy,
    diet,
    stock,
    popular,
    status,
    limit,
    offset,
  ];

  const queryClient = useQueryClient();

  const [isAddModal, setIsAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const menuData = [
    {
      _id: 1,
      name: "Amritsari Lassi",
      type: 1, // 1 = veg, 2 = non-veg
      category: [
        { _id: "cat1", name: "Indian Drinks" },
        { _id: "cat2", name: "Drinks" },
      ],
      isPopular: true,
      points: 230,
      spiceLevel: "Mild Level",
      allergies: [
        { _id: "all1", name: "Milk" },
        { _id: "all2", name: "Egg" },
        { _id: "all3", name: "Wheat" },
      ],
      addons: [],
      stock: [
        { _id: "stock1", name: "In stock", color: "success", current: true },
        {
          _id: "stock2",
          name: "Out of stock",
          color: "danger",
          current: false,
        },
        {
          _id: "stock3",
          name: "Sold out for today",
          color: "warning",
          current: false,
        },
      ],
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      plu_code: "1666777309746",
      status: 1, // 1 = Published, 2 = Drafts
      price: 20,
      discountPercentage: 10,
    },
    {
      _id: 2,
      name: "Chicken Biriyani",
      type: 2, // 1 = veg, 2 = non-veg
      category: [
        { _id: "cat1", name: "Biriyanyi" },
        { _id: "cat2", name: "Chicken" },
      ],
      isPopular: true,
      points: 0,
      spiceLevel: "No",
      allergies: [],
      addons: [
        { _id: "add1", name: "Coke" },
        { _id: "add2", name: "Dips" },
        { _id: "add3", name: "Desserts" },
      ],
      stock: [
        { _id: "stock1", name: "In stock", color: "success", current: false },
        { _id: "stock2", name: "Out of stock", color: "danger", current: true },
        {
          _id: "stock3",
          name: "Sold out for today",
          color: "warning",
          current: false,
        },
      ],
      createdBy: "Admin",
      createdDate: "15 Oct 2022",
      updatedDate: "17 Oct 2022",
      plu_code: "1666777309746",
      status: 2, // 1 = Published, 2 = Drafts
      price: 30,
      discountPercentage: 0,
    },
  ];

  const categoryDropdown = [
    { value: 1, label: "Category 1" },
    { value: 2, label: "Category 2" },
    { value: 3, label: "Category 3" },
    { value: 4, label: "Category 4" },
    { value: 5, label: "Category 5" },
    { value: 6, label: "Category 6" },
    { value: 7, label: "Category 7" },
    { value: 8, label: "Category 8" },
  ];

  const spiceDropdown = [
    { value: 1, label: "Mild Level" },
    { value: 2, label: "Hot Level" },
    { value: 3, label: "Extra Level" },
  ];

  const addonDropdown = [
    { value: 1, label: "Milk" },
    { value: 2, label: "Egg" },
    { value: 3, label: "Wheat" },
  ];

  const [staticStockArr, setStaticStockArr] = useState([
    { _id: "", name: "All", color: "success", current: true },
    { _id: 1, name: "In stock", color: "success", current: false },
    { _id: 2, name: "Out of stock", color: "danger", current: false },
    { _id: 3, name: "Sold out for today", color: "warning", current: false },
  ]);

  const type = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Veg", color: "success", current: false },
    { _id: 3, name: "Non Veg", color: "danger", current: false },
  ];

  const [popularity, setPopularity] = useState([
    { _id: "", name: "All", color: "success", current: true },
    { _id: true, name: "Popular", color: "warning", current: false },
    { _id: false, name: "Non Popular", color: "", current: false },
  ]);

  const [statusStatic, setStatusStaic] = useState([
    { _id: "", name: "All", color: "success", current: false },
    { _id: 1, name: "Published", color: "success", current: true },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ]);

  const addModal = () => {
    setIsAddModal(true);
  };

  useEffect(() => {
    if (editProductId !== "") {
      refetch();
    }
  }, [editProductId, refetch]);

  console.log(productCount);

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search
              state={keyword}
              setState={setKeyword}
              placeholder={"Search..."}
            />
          </div>
          <Category
            selectedCatOpt={selectedCatOpt}
            setSelectedCatOpt={setSelectedCatOpt}
            setCatArr={setSelectedCat}
          />

          <SpiceLvl
            selectedSpiceOpt={selectedSpiceOpt}
            setSelectedSpiceOpt={setSelectedSpiceOpt}
            setSpiceArr={setSelectedSpice}
          />

          <Allergy
            selectedAllergyOpt={selectedAllergyOpt}
            setSelectedAllergyOpt={setSelectedAllergyOpt}
            setAllergyArr={setSelectedAllergy}
          />

          <div className="input-items items-end gap-3">
            <Button
              classes={"px-2"}
              icon={"fa-regular fa-arrow-rotate-right"}
              iconPosition={"left"}
              functions={() => {
                setOffset(0);
                setKeyword("");
                setSelectedCat([]);
                setSelectedSpice([]);
                setSelectedAllergy([]);
                setDiet("");
                setStock("");
                setPopular("");
                setStatus("");
                setStaticStockArr([]);
                setPopularity([]);
                setStatusStaic([]);
                setSelectedCatOpt([]);
                setSelectedAllergyOpt([]);
                setSelectedSpiceOpt([]);
                setTimeout(() => {
                  setStaticStockArr([
                    { _id: "", name: "All", color: "success", current: true },
                    {
                      _id: 1,
                      name: "In stock",
                      color: "success",
                      current: false,
                    },
                    {
                      _id: 2,
                      name: "Out of stock",
                      color: "danger",
                      current: false,
                    },
                    {
                      _id: 3,
                      name: "Sold out for today",
                      color: "warning",
                      current: false,
                    },
                  ]);
                  setPopularity([
                    { _id: "", name: "All", color: "success", current: true },
                    {
                      _id: true,
                      name: "Popular",
                      color: "warning",
                      current: false,
                    },
                    {
                      _id: false,
                      name: "Non Popular",
                      color: "",
                      current: false,
                    },
                  ]);
                  setStatusStaic([
                    { _id: "", name: "All", color: "success", current: false },
                    {
                      _id: 1,
                      name: "Published",
                      color: "success",
                      current: true,
                    },
                    { _id: 3, name: "Draft", color: "warning", current: false },
                  ]);
                }, 1000);
                queryClient.invalidateQueries(queryProduct);
                queryClient.removeQueries({
                  queryKey: ["products"],
                  type: "inactive",
                });
              }}
            />
            <Button
              label={"Add Food"}
              labelClasses={""}
              classes={""}
              icon={"fa-regular fa-plus"}
              iconPosition={"left"}
              functions={addModal}
            />
          </div>
        </div>
        <div className="radio-filters">
          {staticStockArr && (
            <RadioGroup
              data={staticStockArr}
              setData={setStock}
              inputName={"stock"}
            />
          )}
          {staticStockArr && <Diet setDiet={setDiet} />}
          {popularity && (
            <RadioGroup
              data={popularity}
              setData={setPopular}
              inputName={"popularity"}
            />
          )}
          <RadioGroup
            data={statusStatic}
            setData={setStatus}
            inputName={"status"}
          />

          </div>

      </div>
      <div className="menu-list">
        <Product
          keyword={keyword}
          categoryArray={selectedCat}
          spiceLevelArray={selectedSpice}
          allergyArray={selectedAllergy}
          diet={diet}
          stock={stock}
          popular={popular}
          status={status}
          limit={limit}
          offset={offset}
          setLimit={setLimit}
          setOffset={setOffset}
          queryProduct={queryProduct}
          detailsFetch={refetch}
          setEditProductId={setEditProductId}
          setEditModal={setEditModal}
          setProductCount={setProductCount}
        />
      </div>
      <Modal
        title={"Add Food"}
        size={"xl"}
        isOpen={isAddModal}
        modalClose={() => setIsAddModal(!isAddModal)}
      >
        <AddFood modalClose={() => setIsAddModal(!isAddModal)} />
      </Modal>
      <Modal
        title={"Edit Food"}
        size={"xl"}
        isOpen={editModal}
        modalClose={() => setEditModal(false)} 
      >


        <AddFood details={details} isFetching={isFetching} queryProduct={queryProduct} modalClose={() => setEditModal(false)} />

      </Modal>
    </>
  );
};

export default MenuList;
