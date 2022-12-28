import Select from "react-select";
import Checkbox from "./Checkbox";

const SelectTag = ({
  data,
  placeholder,
  label,
  labelClasses,
  inputRequired,
  isCheckbox,
  checkboxPosition,
  checkboxInputName,
  setStateId,
  selectedOptions,
setSelectedOptions,
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
          </div>
        )}
        <Select
          className="select-tag"
          isMulti={true}
          isClearable={true}
          options={data}
          value={selectedOptions || []}
          placeholder={placeholder}
          onChange={(e) => {
            let a = [];
            e.forEach((item) => {
              a.push(item.value);
            });
            setStateId(a);
            setSelectedOptions(e);
          }}
        />
      </div>
    </>
  );
};

export default SelectTag;
