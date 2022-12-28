import { useState } from "react";
import { Link } from "react-router-dom";
import { setTitle } from "../../helpers/MetaTag";
import Image from "../../components/Elements/Image";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

const Login = () => {
  setTitle("Dabbawala | Signin");

  const [name, setName] = useState();

  const [isForgot, setIsForgot] = useState(false);
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const forgotPassword = () => {
    setIsForgot(!isForgot);
  };

  return (
    <>
      <div className="authentication-content">
        <div className="brand">
          <Link to="/" className="logo">
            <Image
              src={"./logo.svg"}
              alt={"Dabbawala"}
              width={"100%"}
              height={"100%"}
              effect={"blur"}
            />
          </Link>
        </div>
        {isForgot ? (
          <>
            <div className="authentication-inner">
              <div className="authentication-title">Forgot Password?</div>
              <div className="authentication-text">
                Enter your email address to get reset link!
              </div>
              <form className="mt-5">
                <div className="mb-3">
                  <Input
                    label={"Email"}
                    inputRequired={true}
                    inputType={"email"}
                    inputPlaceholder={"Example: admin@dabbawala.com"}
                    inputName={""}
                  />
                </div>
                <div className="mb-3">
                  <Button
                    label={"Reset Password"}
                    classes={"w-100"}
                    icon={"fa-light fa-key"}
                    iconPosition={"left"}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    label={"Signin"}
                    classes={"main-button-link text-color-02"}
                    labelClasses={"text-sm"}
                    functions={forgotPassword}
                  />
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="authentication-inner">
              <div className="authentication-title">Welcome Back</div>
              <div className="authentication-text">
                Signin with your credentials to continue
              </div>
              <form className="mt-5">
                <div className="mb-3">
                  <Input
                    label={"Email"}
                    inputRequired={true}
                    inputType={"email"}
                    inputPlaceholder={"Example: admin@dabbawala.com"}
                    inputName={""}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    label={"Password"}
                    inputRequired={true}
                    inputType={"password"}
                    inputPlaceholder={"**********"}
                    inputName={""}
                    functions={handelSubmit}
                  />
                </div>
                <div className="mb-3">
                  <Button
                    label={"Signin"}
                    classes={"w-100"}
                    icon={"fa-light fa-arrow-right-to-arc"}
                    iconPosition={"left"}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    label={"Forgot Password"}
                    classes={"main-button-link text-color-02"}
                    labelClasses={"text-sm"}
                    functions={forgotPassword}
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
