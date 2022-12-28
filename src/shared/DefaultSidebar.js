import React from 'react';
import SideNavigation from "../components/Navigation/SideNavigation";
import Brand from "../components/Partials/Brand";

const DefaultSidebar = () => {

  const navigationData = [
    {_id:1, label:'Dashboard', link:'/dashboard', icon:'fa-grid-2' },
    {_id:2, label:'Menu', link:'/menu?tab=list', icon:'fa-fork-knife' },
    {_id:3, label:'Orders', link:'/orders', icon:'fa-box' },
    {_id:4, label:'Jobs', link:'/jobs', icon:'fa-briefcase' },
    {_id:5, label:'CMS', link:'/cms', icon:'fa-file-pen' },
    {_id:6, label:'Take off Time', link:'/take-off-time', icon:'fa-clock' },
    {_id:7, label:'Blogs', link:'/blogs?tab=list', icon:'fa-pencil' },
    {_id:8, label:'FAQs', link:'/faqs?tab=list', icon:'fa-circle-question' },
    {_id:9, label:'Customers', link:'/users', icon:'fa-user' },
  ]

  return (
    <>
      <div className="sidepanel">
        <div className="site-identity">
          <Brand image={'logo.svg'} alt={'Dabbawala'}/>
        </div>
        <div className="side-navigation scrollbar scrollbar-alt">
          <SideNavigation data={navigationData}/>
        </div>
      </div>
    </>
  );
};

export default DefaultSidebar;