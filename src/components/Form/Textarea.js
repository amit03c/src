import Checkbox from "./Checkbox";
import Button from "./Button";

const Textarea = ({
  state,
  setState,
  label,
  labelClasses,
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
  ...props
}) => {
  return (
    <>
      <div className="input">
        {label && (
          <div className="input-options">
            {isCheckbox && checkboxPosition === "left" && (
              <Checkbox inputName={checkboxInputName} />
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
            <textarea
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={"input-field scrollbar" + (" " + inputClasses)}
              placeholder={inputPlaceholder}
              name={inputName}
              defaultValue={inputValue}
              disabled
            ></textarea>
          ) : (
            <textarea
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={"input-field scrollbar" + (" " + inputClasses)}
              placeholder={inputPlaceholder}
              name={inputName}
              defaultValue={inputValue}
            ></textarea>
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

export default Textarea;
