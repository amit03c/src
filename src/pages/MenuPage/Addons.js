import { useState } from "react";
import Button from "../../components/Form/Button";
import Search from "../../components/Form/Search";
import SelectTag from "../../components/Form/SelectTag";
import RadioGroup from "../../components/Form/RadioGroup";
import AddonItem from "../../components/Items/AddonItem";
import Confirm from "../../components/Elements/Confirm";
import Modal from "../../components/Elements/Modal";
import AddonGroup from "../../components/Modals/AddonGroup";
import AddAddons from "../../components/Modals/AddAddons";
import { useQueryClient } from "@tanstack/react-query";

const Addons = () => {
  const queryClient = useQueryClient();

  const diets = queryClient.getQueryData([
    "products",
    "",
    [],
    [],
    [],
    "",
    "",
    "",
    "",
  ]);
  console.log(diets);

  const [isAddonGroupModal, setIsAddonGroupModal] = useState(false);
  const [isAddonModal, setIsAddonModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const menuData = [
    {
      _id: 1,
      name: "Cold Drinks",
      category: [
        { _id: "cat1", name: "Indian Drinks" },
        { _id: "cat2", name: "Drinks" },
      ],
      product: [
        { _id: "product1", name: "Chicken Tikka" },
        { _id: "product2", name: "Chicken Biriyani" },
        { _id: "product3", name: "Chilli Chicken" },
      ],
      spiceLevel: [
        { _id: "spice1", name: "Mild Level" },
        { _id: "spice2", name: "Hot Level" },
        { _id: "spice3", name: "Extra Level" },
      ],
      allergies: [
        { _id: "all1", name: "Milk" },
        { _id: "all2", name: "Egg" },
        { _id: "all3", name: "Wheat" },
      ],
      minQuantity: 1,
      maxQuantity: 5,
      createdDate: "15 Oct 2022",
      status: 1, // 1 = Published, 2 = Drafts
      priceLower: 10,
      priceUpper: 20,
    },
    {
      _id: 2,
      name: "Lassi",
      category: [
        { _id: "cat1", name: "Lassi" },
        { _id: "cat2", name: "Drinks" },
      ],
      product: [
        { _id: "product1", name: "Chicken Tikka" },
        { _id: "product2", name: "Chicken Biriyani" },
        { _id: "product3", name: "Chilli Chicken" },
      ],
      spiceLevel: [
        { _id: "spice1", name: "Mild Level" },
        { _id: "spice2", name: "Hot Level" },
        { _id: "spice3", name: "Extra Level" },
      ],
      allergies: [
        { _id: "all1", name: "Milk" },
        { _id: "all2", name: "Egg" },
        { _id: "all3", name: "Wheat" },
      ],
      minQuantity: 1,
      maxQuantity: 5,
      createdDate: "15 Oct 2022",
      status: 2, // 1 = Published, 2 = Drafts
      priceLower: 20,
      priceUpper: 30,
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

  const type = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Veg", color: "success", current: false },
    { _id: 3, name: "Non Veg", color: "danger", current: false },
  ];

  const status = [
    { _id: 1, name: "All", color: "success", current: true },
    { _id: 2, name: "Published", color: "success", current: false },
    { _id: 3, name: "Draft", color: "warning", current: false },
  ];

  const addonGroupModal = () => {
    setIsAddonGroupModal(true);
  };

  const deleteItem = () => {
    setIsOpenConfirm(true);
  };

  return (
    <>
      <div className="page-filter mb-3">
        <div className="input-filters">
          <div className="input-items">
            <Search placeholder={"Search..."} />
          </div>
          <div className="input-items">
            <SelectTag data={categoryDropdown} placeholder={"Category"} />
          </div>
          <div className="input-items">
            <SelectTag data={spiceDropdown} placeholder={"Spice Level"} />
          </div>
          <div className="input-items">
            <SelectTag data={addonDropdown} placeholder={"Addons"} />
          </div>
          <div className="input-items items-end gap-3">
            <Button
              classes={"px-2"}
              icon={"fa-regular fa-arrow-rotate-right"}
              iconPosition={"left"}
              functions={deleteItem}
            />
            <Button
              label={"Add Addon Group"}
              icon={"fa-regular fa-plus"}
              iconPosition={"left"}
              functions={addonGroupModal}
            />
          </div>
        </div>
        <div className="radio-filters">
          <RadioGroup data={type} inputName={"type"} />
          <RadioGroup data={status} inputName={"status"} />
        </div>
      </div>
      <div className="addons-list">
        {menuData.map((item) => (
          <AddonItem
            key={item._id}
            name={item.name}
            category={item.category}
            product={item.product}
            spiceLevel={item.spiceLevel}
            allergies={item.allergies}
            minQuantity={item.minQuantity}
            maxQuantity={item.maxQuantity}
            createdDate={item.createdDate}
            status={item.status}
            priceLower={item.priceLower}
            priceUpper={item.priceUpper}
          />
        ))}
      </div>

      <Modal
        title={"Add Addon Group"}
        size={"md"}
        isOpen={isAddonGroupModal}
        modalClose={() => setIsAddonGroupModal(!isAddonGroupModal)}
      >
        <AddonGroup isOpen={isAddonModal} setIsOpen={setIsAddonModal} />
      </Modal>

      <Modal
        title={"Add Addon"}
        size={"xl"}
        isOpen={isAddonModal}
        modalClose={() => setIsAddonModal(!isAddonModal)}
      >
        <AddAddons />
      </Modal>

      <Confirm
        icon={"fa-regular fa-xmark"}
        iconColorClass={"bg-danger"}
        title={"Delete"}
        text={"Are you really want to delete item?"}
        isOpen={isOpenConfirm}
        confirmClose={() => setIsOpenConfirm(false)}
      />
    </>
  );
};

export default Addons;
