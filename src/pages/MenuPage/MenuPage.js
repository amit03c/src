import { useEffect, useState } from "react";
import { setTitle } from "../../helpers/MetaTag";
import { useLocation } from "react-router-dom";
import TopNavigation from "../../components/Navigation/TopNavigation";
import MenuList from "./MenuList";
import Addons from "./Addons";
import Merchandise from "./Merchandise";
import Coupon from "./Coupon";
import Categories from "./Categories";
import Allergies from "./Allergies";
import Spiecelevel from "./Spicelevel";
import Diets from "./Diets";
const MenuPage = () => {
  setTitle("Dabbawala | Menu");
  const [currentLocation, setCurrentLocation] = useState();

  const location = useLocation();
  const tabData = [
    {
      _id: 1,
      label: "Menu List",
      link: "/menu",
      search: "?tab=list",
      component: <MenuList />,
    },
    {
      _id: 2,
      label: "Add On Group",
      link: "/menu",
      search: "?tab=addons",
      component: <Addons />,
    },
    {
      _id: 3,
      label: "Categories",
      link: "/menu",
      search: "?tab=categories",
      component: <Categories />,
    },
    {
      _id: 4,
      label: "Allergies",
      link: "/menu",
      search: "?tab=allergies",
      component: <Allergies />,
    },
    {
      _id: 5,
      label: "Spice Level",
      link: "/menu",
      search: "?tab=spice-level",
      component: <Spiecelevel />,
    },
    {
      _id: 6,
      label: "Diets",
      link: "/menu",
      search: "?tab=diets",
      component: <Diets />,
    },
    {
      _id: 7,
      label: "Merchandise",
      link: "/menu",
      search: "?tab=merchandies",
      component: <Merchandise />,
    },
    {
      _id: 8,
      label: "Coupon",
      link: "/menu",
      search: "?tab=coupons",
      component: <Coupon />,
    },
  ];

  useEffect(() => {
    let index = tabData.findIndex((tab) => tab.search === location.search);
    if (index !== -1) {
      setCurrentLocation(tabData[index]);
    }
  }, [location]);

  return (
    <>
      <TopNavigation data={tabData} />
      <div className="page-content">
        {currentLocation && currentLocation.component}
      </div>
    </>
  );
};

export default MenuPage;
