import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import TopNavigation from "../../components/Navigation/TopNavigation";
import {setTitle} from '../../helpers/MetaTag';
import AuthorsList from "./AuthorsList";
import BlogList from "./BlogsList";
import CommentsList from "./CommentsList";

const Blogs = () => {
  setTitle('Dabbawala | Blogs');
  const [currentLocation, setCurrentLocation] = useState();

  const location = useLocation();
  const tabData = [
    {_id:1, label:'Blogs List', link:'/blogs', search:'?tab=list' , component: <BlogList/>},
    {_id:2, label:'Authors', link:'/blogs', search:'?tab=authors' , component: <AuthorsList/>},
    {_id:3, label:'Comments', link:'/blogs', search:'?tab=comments' , component: <CommentsList/>},
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

export default Blogs;
