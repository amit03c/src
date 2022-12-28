const Radio = ({
  id,
  label,
  inputName,
  classes,
  current,
  inputRequired,
  setCurrent,
}) => {
  return (
    <>
      <div className={"radio" + (" " + classes)}>
        <input
          type="radio"
          name={inputName}
          className="radio-input"
          defaultChecked={current}
          onChange={() => setCurrent(id)}
        />
        <div className="radio-icon"></div>
        {label && (
          <div className={"radio-label" + (inputRequired ? " required" : "")}>
            {label}
          </div>
        )}
      </div>
    </>
  );
};

export default Radio;
