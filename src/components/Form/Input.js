import { useEffect, useState, useRef } from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";

const Input = ({
  state,
  setState,
  label,
  labelClasses,
  inputType,
  inputClasses,
  inputPlaceholder,
  inputValue,
  inputName,
  inputRequired,
  errorType,
  errorText,
  isDisabled,
  isCheckbox,
  checkboxPosition,
  checkboxInputName,
  labelButtonName,
  labelButtonFunction,
  current,
  setCurrent,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordInput = useRef(null);
  const handleChange = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  useEffect(() => {
    passwordInput.current.type = passwordVisibility ? "text" : inputType;
  }, [passwordVisibility]);

  return (
    <>
      <div className="input">
        {label && (
          <div className="input-options">
            {isCheckbox && checkboxPosition === "left" && (
              <Checkbox current={current} setCurrent={setCurrent} inputName={checkboxInputName} />
            )}
            <div
              className={
                "input-label" +
                (" " + labelClasses) +
                (inputRequired ? " required" : "")
              }
            >
              {label}
            </div>
            {isCheckbox && checkboxPosition === "right" && (
              <Checkbox inputName={checkboxInputName} />
            )}
            {labelButtonName && (
              <Button
                label={labelButtonName}
                functions={labelButtonFunction}
                classes={"label-button ms-auto"}
              />
            )}
          </div>
        )}
        <div className="input-style">
          {isDisabled ? (
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type={inputType}
              ref={passwordInput}
              className={"input-field" + (" " + inputClasses)}
              placeholder={inputPlaceholder}
              name={inputName}
              defaultValue={inputValue}
              autoComplete={"new-" + inputType}
              disabled={true}
            />
          ) : (
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type={inputType}
              ref={passwordInput}
              className={"input-field" + (" " + inputClasses)}
              placeholder={inputPlaceholder}
              name={inputName}
              defaultValue={inputValue}
              autoComplete={"new-" + inputType}
            />
          )}
          {inputType === "password" && (
            <button
              type="button"
              className="input-button"
              onClick={handleChange}
            >
              <i
                className={
                  "fa-regular fa-fw " +
                  (passwordVisibility ? "fa-eye-slash" : "fa-eye")
                }
              ></i>
            </button>
          )}
        </div>
        {errorType && errorType === "error" && (
          <div className="input-note text-danger">
            <i className="fa-regular fa-fw fa-square-exclamation"></i>
            {errorText}
          </div>
        )}
        {errorType && errorType === "warning" && (
          <div className="input-note text-warning">
            <i className="fa-regular fa-fw fa-triangle-exclamation"></i>
            {errorText}
          </div>
        )}
        {errorType && errorType === "success" && (
          <div className="input-note text-success">
            <i className="fa-regular fa-fw fa-circle-check"></i>
            {errorText}
          </div>
        )}
        {errorType && errorType === "info" && (
          <div className="input-note text-info">
            <i className="fa-regular fa-fw fa-circle-info"></i>
            {errorText}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
