import { Outlet } from "react-router-dom";
import DefaultHeader from "../shared/DefaultHeader";
import DefaultSidebar from "../shared/DefaultSidebar";

const DefaultLayout = () => {
  return (
    <>
      <div className="main">
        <div className="main-aside">
          <DefaultSidebar />
        </div>
        <div className="main-content">
          <DefaultHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
