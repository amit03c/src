import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import TopNavigation from "../../components/Navigation/TopNavigation";
import {setTitle} from '../../helpers/MetaTag';
import FaqCategory from "./FaqCategory";
import FaqFeedback from "./FaqFeedback";
import FaqList from "./FaqList";

const Faqs = () => {
  setTitle('Dabbawala | Faqs');
  const [currentLocation, setCurrentLocation] = useState();

  const location = useLocation();
  const tabData = [
    {_id:1, label:'Category', link:'/faqs', search:'?tab=list' , component: <FaqCategory/>},
    {_id:2, label:'FAQs List', link:'/faqs', search:'?tab=authors' , component: <FaqList/>},
    {_id:3, label:'FAQs Feedback', link:'/faqs', search:'?tab=comments' , component: <FaqFeedback/>},
  ]

  useEffect(()=>{
    let index = tabData.findIndex((tab) => tab.search === location.search)
    if(index !== -1){
      setCurrentLocation(tabData[index]);
    }
  },[location]);

  return (
    <>
     <TopNavigation data={tabData}/>
      <div className="page-content">
      {currentLocation &&
          currentLocation.component
        }
      </div>
    
    </>
  );
};

export default Faqs;
