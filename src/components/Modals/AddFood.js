import { useEffect, useState } from "react";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Checkbox from "../Form/Checkbox";
import RadiosLabel from "../Form/RadiosLabel";
import Button from "../Form/Button";
import ImageUploadPreview from "../Form/ImageUploadPreview";
import SelectTag from "../Form/SelectTag";
import PreviewProduct from "../Elements/PreviewProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { hostUrl } from "../../config/host";

function useAddon() {
  return useQuery({
    queryKey: ["addon_dropdown"],
    queryFn: async () => {
      let tmp = [];
      const { data } = await axios.post(
        `${hostUrl}/v2/products/list`,
        {
          product_type: 2,
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

const AddFood = ({ modalClose, details, isFetching, queryProduct }) => {
  const queryClient = useQueryClient();

  const diets = queryClient.getQueryData(["diets"]);
  const category = queryClient.getQueryData(["categories_dropdown"]);
  const allergy = queryClient.getQueryData(["allergy_dropdown"]);
  const spiceLvl = queryClient.getQueryData(["spice_level_dropdown"]);

  const { data: addon } = useAddon();

  
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    let a = [];
    diets &&
      diets.forEach((item) => {
        if (item._id !== "") {
          a.push({ _id: item._id, label: item.name, inputName: "diet" });
        }
      });
    setDietData(a);
  }, [diets]);

  const [isPreview, setIspreview] = useState(false);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [regular_price, setRegular_price] = useState("");
  const [sale_price, setSale_price] = useState("");
  const [price_point, setPrice_point] = useState("");
  const [price_point_disble, setPrice_point_disable] = useState(false);
  const [plu_code, setPlu_code] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [in_stock, setIn_stock] = useState(1);
  const [diet_id, setDiet_id] = useState("");
  const [status, setStatus] = useState(1); //
  const [product_category_id, setProduct_category_id] = useState([]);
  const [allergie_id, setAllergie_id] = useState([]);
  const [spice_level_id, setSpice_level_id] = useState([]);
  const [addon_id, setAddon_id] = useState([]);

  const [selectedCatAddOpt, setSelectedCatAddOpt] = useState([]);
  const [selectedAllergieAddOpt, setSelectedAllergieAddOpt] = useState([]);
  const [selectedAddonAddOpt, setSelectedAddonAddOpt] = useState([]);
  const [selectedSpiceAddOpt, setSelectedSpiceAddOpt] = useState([]);

  const [selectedCatOpt, setSelectedCatOpt] = useState([]);
  const [selectedAllergieOpt, setSelectedAllergieOpt] = useState([]);
  const [selectedAddonOpt, setSelectedAddonOpt] = useState([]);
  const [selectedSpiceOpt, setSelectedSpiceOpt] = useState([]);

  const [stockManageData, setStockManageData] = useState([
    { _id: 1, label: "In Stock", inputName: "stockManage", current: true },
    {
      _id: 2,
      label: "Sold out for today",
      inputName: "stockManage",
      current: false,
    },
    { _id: 3, label: "Out of stock", inputName: "stockManage", current: false },
  ]);

  const [publishedData, setPublishedData] = useState([
    { _id: 1, label: "Published", inputName: "publish_status", current: true },
    { _id: 3, label: "Draft", inputName: "publish_status", current: false },
  ]);

  const [uploadData, setUploadData] = useState([]);

  const demoOptionsData = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
    { value: 4, label: "Option 4" },
    { value: 5, label: "Option 5" },
    { value: 6, label: "Option 6" },
    { value: 7, label: "Option 7" },
    { value: 8, label: "Option 8" },
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
    { value: 4, label: "Option 4" },
    { value: 5, label: "Option 5" },
    { value: 6, label: "Option 6" },
    { value: 7, label: "Option 7" },
    { value: 8, label: "Option 8" },
  ];

  const openPreview = () => {
    setIspreview(!isPreview);
  };

  const previewData = [
    {
      name: "Gujrati Snack",
      image: "images/product.png",
      price: "30",
      ingredients: [
        { _id: 1, name: "Milk", image: "images/milk.svg" },
        { _id: 2, name: "Wheat", image: "images/wheat.svg" },
        { _id: 3, name: "Peanut", image: "images/peanut.svg" },
        { _id: 4, name: "Avocado", image: "images/avocado.svg" },
        { _id: 5, name: "Wallnut", image: "images/wallnut.svg" },
        { _id: 6, name: "Peas", image: "images/peas.svg" },
      ],
    },
  ];

  useEffect(() => {
    setPlu_code(Date.now());
  }, []);

  function generatePlu_code() {
    setPlu_code(Date.now());
  }

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0ODljOGRlYzQ2NTRhNjgzYTc4ZWMiLCJuYW1lIjoiRGFiYmF3YWxhIiwiZW1haWwiOiJhZG1pbkBkYWJiYXdhbGEuY29tIiwiaW1hZ2UiOiJodHRwOi8vbG9jYWxob3N0OjkwMDB1cGxvYWRzL3Byb2ZpbGUtaW1hZ2VzLzE2NjEyNDIxNTk0MDRjYmM5NjRmYTc3NDNhNGNkOTYxMGFlZWQucG5nIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsX3ZlcmlmaWVkX2RhdGUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xM1QwNjo1MjowNC41MzRaIiwic3RhdHVzIjp0cnVlLCJyb2xlX2lkIjoiNjMzNDI3OGM3YzAxZWVlNjc0ZDZkOGViIiwiaWF0IjoxNjcxNzcwMzk0LCJleHAiOjE2NzIzNzUxOTR9.HJus5rVTaYdViOKUmIowVaMZ2puUSk_FYTGSmnOaB0Q`,
    },
  };
  //  

  const submitProduct = useMutation(
    (newProduct) =>
      axios
        .post(
          `${hostUrl}/v2/products/create`,
          newProduct,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryProduct);
          queryClient.removeQueries({
            queryKey: ["products"],
            type: "inactive",
          });
          setTitle("");
          setRegular_price("");
          setSale_price("");
          setPrice_point("");
          setPlu_code(Date.now());
          setDescription("");
          setFeatured(false);
          setIn_stock(1);
          setDiet_id("");
          setStatus(1);
          setProduct_category_id([]);
          setAllergie_id([]);
          setSpice_level_id([]);
          setAddon_id([]);
          modalClose();
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  const submitEditedProduct = useMutation(
    (editProduct) =>
      axios
        .post(
          `${hostUrl}/v2/products/edit`,
          editProduct,
          config
        )
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        console.log(res);
        if (res.status === 200) {
          queryClient.invalidateQueries(queryProduct);
          queryClient.removeQueries({
            queryKey: ["products"],
            type: "inactive",
          });
          setTitle("");
          setRegular_price("");
          setSale_price("");
          setPrice_point("");
          setPlu_code(Date.now());
          setDescription("");
          setFeatured(false);
          setIn_stock(1);
          setDiet_id("");
          setStatus(1);
          setProduct_category_id([]);
          setAllergie_id([]);
          setSpice_level_id([]);
          setAddon_id([]);
          modalClose();
        }
      },
      onError: (res) => {
        console.log(res);
      },
    }
  );

  useEffect(() => {
    if(details){
      setProductId(details ? details._id : "");
      setTitle(details ? details.title : "");
      setDescription(details ? details.short_description : "");
      setRegular_price(details ? details.regular_price : "");
      setPrice_point(details ? details.price_point : "");
      setSale_price(details ? details.sale_price : "");
      setPlu_code(details ? details.plu_code : "");
      setDiet_id(details ? details.diet_details?._id : "")
      setIn_stock(details ? details.in_stock : true);
      setUploadData(details ? [{ _id: 1, image: details.image }] : []);
      setStatus(details ? details.status : "");
      setFeatured(false);
      setPublishedData([]);
      setStockManageData([]);
      setDietData([]);

      let a = [];
      diets &&
        diets.forEach((item) => {
          if (item._id !== "") {
            a.push({ _id: item._id, label: item.name, inputName: "diet", current: details?.diet_details.title === item.name ? true : false });
          }
        });

      let tmpCat = []
      let tmpCatID = []

      details && details.category_list?.forEach((item) => {
        tmpCatID.push(item._id);
        tmpCat.push({label: item.title, value: item._id});
      });

      
      
      let tmpSpice = []
      let tmpSpiceID = []

      details && details.spice_level_list?.forEach((item) => {
        tmpSpiceID.push(item._id);
        tmpSpice.push({label: item.title, value: item._id});
      });

      let tmpAllergie = []
      let tmpAllergieID = []

      details && details.allergie_list?.forEach((item) => {
        tmpAllergieID.push(item._id);
        tmpAllergie.push({label: item.title, value: item._id});
      });

      let tmpAddon = []
      let tmpAddonID = []

      details && details.addon_list?.forEach((item) => {
        tmpAddonID.push(item._id);
        tmpAddon.push({label: item.title, value: item._id});
      });


      setTimeout(() => {
      setFeatured(details ? details.featured : false);
      setDietData(a);

      setSelectedCatOpt(tmpCat);
      setProduct_category_id(tmpCatID);
      
      setSelectedSpiceOpt(tmpSpice);
      setSpice_level_id(tmpSpiceID);

      setSelectedAllergieOpt(tmpAllergie);
      setAllergie_id(tmpAllergieID);

      setSelectedAddonOpt(tmpAddon);
      setAddon_id(tmpAddonID);


      setPublishedData(
        details
          ? [
            {
              _id: 1,
              label: "Published",
              inputName: "publish_status",
              current: details.status === 1 ? true : false,
            },
            {
              _id: 3,
              label: "Draft",
              inputName: "publish_status",
              current: details.status === 3 ? true : false,
            },
          ]
          : []
      );

      setStockManageData(
        details
          ? [
            {
              _id: 1,
              label: "In Stock",
              inputName: "stockManage",
              current: details.in_stock === 1 ? true : false,
            },
            {
              _id: 2,
              label: "Out of stock",
              inputName: "stockManage",
              current: details.in_stock === 2 ? true : false,
            },
            {
              _id: 3,
              label: "Sold out for today",
              inputName: "stockManage",
              current: details.in_stock === 3 ? true : false,
            },
          ]
          : []
      );
    }, 700)}
    
    
  }, [details]);

  console.log(product_category_id);

  if (isFetching) {
    return (
      <div>Loading 🫠</div>
    )
  }

  if (details) {
    return (
      <>
        <div className="px-2">
          <div className="row divide-x">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-7">
                  <div className="mb-3">
                    <Input
                      state={title}
                      setState={setTitle}
                      label={"Product Name"}
                      inputRequired={true}
                      inputType={"text"}
                      inputPlaceholder={"Example . Pizza"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mb-3">
                    <Input
                      state={plu_code}
                      setState={setPlu_code}
                      label={"PLU Code"}
                      inputRequired={true}
                      inputType={"text"}
                      inputPlaceholder={"1667303409038"}
                      inputName={""}
                      labelButtonName={"Generate"}
                      labelButtonFunction={generatePlu_code}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={regular_price}
                      setState={setRegular_price}
                      label={"Regular Price"}
                      inputRequired={true}
                      inputType={"number"}
                      inputPlaceholder={"€ 250"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={sale_price}
                      setState={setSale_price}
                      label={"Sale Price"}
                      inputRequired={true}
                      inputType={"number"}
                      inputPlaceholder={"€ 150"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={price_point}
                      setState={setPrice_point}
                      label={"Point Sale"}
                      inputRequired={false}
                      inputType={"number"}
                      inputPlaceholder={"€ 150"}
                      inputName={""}
                      isCheckbox={true}
                      checkboxPosition={"left"}
                      isDisabled={price_point_disble}
                      current={price_point_disble}
                      setCurrent={setPrice_point_disable}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <Textarea
                      state={description}
                      setState={setDescription}
                      label={"Description"}
                      inputRequired={true}
                      inputPlaceholder={"Write description......."}
                      inputName={""}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    {stockManageData !== [] && (
                      <Checkbox
                        current={featured}
                        setCurrent={setFeatured}
                        label={"Popular"}
                        inputName={"popular_checkbox"}
                        inputRequired={true}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    {stockManageData && (
                      <RadiosLabel
                        setRadio={setIn_stock}
                        data={stockManageData}
                        label={"Stock Manage"}
                        inputRequired={true}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    {dietData && <RadiosLabel
                      setRadio={setDiet_id}
                      data={dietData}
                      label={"Diet"}
                      inputRequired={true}
                    />}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    {publishedData && (
                      <RadiosLabel
                        setRadio={setStatus}
                        data={publishedData}
                        label={"Status"}
                        inputRequired={true}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      label={"Save"}
                      functions={() =>
                        submitEditedProduct.mutate({
                          id: productId,
                          product_type: 1,
                          title: title,
                          plu_code: plu_code,
                          regular_price: parseInt(regular_price),
                          sale_price: parseInt(sale_price),
                          price_point: parseInt(price_point),
                          short_description: description,
                          featured: featured,
                          in_stock: in_stock,
                          status: status,
                          image: uploadData && uploadData[0]?.image.includes('https') ? null : uploadData[0]?.image,
                          product_category_id: product_category_id
                            ? product_category_id
                            : null,
                          allergie_id: allergie_id ? allergie_id : null,
                          spice_level_id: spice_level_id
                            ? spice_level_id
                            : null,
                          diet_id: diet_id ? diet_id : null,
                          addon_id: addon_id ? addon_id : null,
                        })
                      }
                    />
                    <Button
                      label={"Cancel"}
                      classes={"main-button-alt"}
                      functions={() => {
                        modalClose();
                        queryClient.removeQueries({
                          queryKey: ["details"],
                        });
                      }}
                    />
                    <Button
                      label={"Preview"}
                      classes={"main-button-link"}
                      functions={openPreview}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              {!isPreview ? (
                <>
                  <div className="row">
                    <div className="col">
                      <ImageUploadPreview
                        setImage={setUploadData}
                        data={uploadData}
                        label={"Upload Image"}
                        inputRequired={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          selectedOptions={selectedCatOpt}
                          setSelectedOptions={setSelectedCatOpt}
                          setStateId={setProduct_category_id}
                          data={category}
                          placeholder={"Example: Product Category"}
                          label={"Product Category"}
                          inputRequired={true}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          selectedOptions={selectedAllergieOpt}
                          setSelectedOptions={setSelectedAllergieOpt}
                          setStateId={setAllergie_id}
                          data={allergy}
                          placeholder={"Example: Allergies"}
                          label={"Allergies"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                        selectedOptions={selectedSpiceOpt}
                        setSelectedOptions={setSelectedSpiceOpt}
                          setStateId={setSpice_level_id}
                          data={spiceLvl}
                          placeholder={"Example: Spice Level"}
                          label={"Spice Level"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          setStateId={setAddon_id}
                          selectedOptions={selectedAddonOpt}
                          setSelectedOptions={setSelectedAddonOpt}
                          data={addon}
                          placeholder={"Example: Add On Products"}
                          label={"Add On Products"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <PreviewProduct
                  data={previewData}
                  previewClose={() => setIspreview(!isPreview)}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="px-2">
          <div className="row divide-x">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-7">
                  <div className="mb-3">
                    <Input
                      state={title}
                      setState={setTitle}
                      label={"Product Name"}
                      inputRequired={true}
                      inputType={"text"}
                      inputPlaceholder={"Example . Pizza"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mb-3">
                    <Input
                      state={plu_code}
                      setState={setPlu_code}
                      label={"PLU Code"}
                      inputRequired={true}
                      inputType={"text"}
                      inputPlaceholder={"1667303409038"}
                      inputName={""}
                      labelButtonName={"Generate"}
                      labelButtonFunction={generatePlu_code}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={regular_price}
                      setState={setRegular_price}
                      label={"Regular Price"}
                      inputRequired={true}
                      inputType={"number"}
                      inputPlaceholder={"€ 250"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={sale_price}
                      setState={setSale_price}
                      label={"Sale Price"}
                      inputRequired={true}
                      inputType={"number"}
                      inputPlaceholder={"€ 150"}
                      inputName={""}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <Input
                      state={price_point}
                      setState={setPrice_point}
                      label={"Point Sale"}
                      inputRequired={false}
                      inputType={"number"}
                      inputPlaceholder={"€ 150"}
                      inputName={""}
                      isCheckbox={true}
                      checkboxPosition={"left"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <Textarea
                      state={description}
                      setState={setDescription}
                      label={"Description"}
                      inputRequired={true}
                      inputPlaceholder={"Write description......."}
                      inputName={""}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <Checkbox
                      current={featured}
                      setCurrent={setFeatured}
                      label={"Popular"}
                      inputName={"popular_checkbox"}
                      inputRequired={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    <RadiosLabel
                      setRadio={setIn_stock}
                      data={stockManageData}
                      label={"Stock Manage"}
                      inputRequired={true}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <RadiosLabel
                      setRadio={setDiet_id}
                      data={dietData}
                      label={"Diet"}
                      inputRequired={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    <RadiosLabel
                      setRadio={setStatus}
                      data={publishedData}
                      label={"Status"}
                      inputRequired={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      label={"Save"}
                      functions={() =>
                        submitProduct.mutate({
                          title: title,
                          product_type: 1,
                          plu_code: plu_code,
                          regular_price: parseInt(regular_price),
                          sale_price: parseInt(sale_price),
                          price_point: parseInt(price_point),
                          short_description: description,
                          featured: featured,
                          in_stock: in_stock,
                          status: status,
                          image: uploadData ? uploadData[0]?.image : null,
                          product_category_id: product_category_id
                            ? product_category_id
                            : null,
                          allergie_id: allergie_id ? allergie_id : null,
                          spice_level_id: spice_level_id
                            ? spice_level_id
                            : null,
                          diet_id: diet_id ? diet_id : null,
                          addon_id: addon_id ? addon_id : null,
                        })
                      }
                    />
                    <Button
                      label={"Cancel"}
                      classes={"main-button-alt"}
                      functions={() => {
                        modalClose();
                        setSelectedCatAddOpt([]);
                      }
                      }
                    />
                    <Button
                      label={"Preview"}
                      classes={"main-button-link"}
                      functions={openPreview}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              {!isPreview ? (
                <>
                  <div className="row">
                    <div className="col">
                      <ImageUploadPreview
                        setImage={setUploadData}
                        data={uploadData}
                        label={"Upload Image"}
                        inputRequired={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          selectedOptions={selectedCatAddOpt}
                          setSelectedOptions={setSelectedCatAddOpt}
                          setStateId={setProduct_category_id}
                          data={category}
                          placeholder={"Example: Product Category"}
                          label={"Product Category"}
                          inputRequired={true}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          setStateId={setAllergie_id}
                          data={allergy}
                          selectedOptions={selectedAllergieAddOpt}
                          setSelectedOptions={setSelectedAllergieAddOpt}
                          placeholder={"Example: Allergies"}
                          label={"Allergies"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          selectedOptions={selectedSpiceAddOpt}
                          setSelectedOptions={setSelectedSpiceAddOpt}
                          setStateId={setSpice_level_id}
                          data={spiceLvl}
                          placeholder={"Example: Spice Level"}
                          label={"Spice Level"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-4">
                        <SelectTag
                          selectedOptions={selectedAddonAddOpt}
                          setSelectedOptions={setSelectedAddonAddOpt}
                          setStateId={setAddon_id}
                          data={addon}
                          placeholder={"Example: Add On Products"}
                          label={"Add On Products"}
                          inputRequired={false}
                          isCheckbox={true}
                          checkboxPosition={"right"}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <PreviewProduct
                  data={previewData}
                  previewClose={() => setIspreview(!isPreview)}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AddFood;
