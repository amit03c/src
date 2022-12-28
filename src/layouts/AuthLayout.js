import { Outlet } from "react-router-dom";
import Image from "../components/Elements/Image";

const AuthLayout = () => {
  return (
    <>
      <div className="authentication">
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-6 d-flex">
              <Outlet />
            </div>
            <div className="col-lg-6">
              <div className="authentication-image">
                <Image
                  src={"images/dabbawala.png"}
                  alt={"Dabbawala"}
                  width={"100%"}
                  height={"100%"}
                  effect={"blur"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="authentication-footer">
              <div className="copyright">
                &copy; Dabbawala 2022 &nbsp; | &nbsp; All rights & reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
