import React from 'react';
import Notifications from "../components/Dropdowns/Notifications";
import UserMenu from "../components/Dropdowns/UserMenu";
import PageTitle from "../components/Partials/PageTitle";
import Store from "../components/Partials/Store";

const DefaultHeader = () => {
  return (
    <>
      <header>
        <div className="header-inner">
          <div className="header-identity">
            <PageTitle title="Menu"/>
          </div>
          <div className="header-store">
            <Store/>
          </div>
          <div className="header-options">
            <Notifications/>
            <UserMenu/>
          </div>
        </div>
      </header>
    </>
  );
};

export default DefaultHeader;