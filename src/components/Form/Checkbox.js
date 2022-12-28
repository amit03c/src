const Checkbox = ({
  label,
  inputName,
  classes,
  current,
  setCurrent,
  inputRequired,
}) => {
  return (
    <>
      <div className={"checkbox" + (" " + classes)}>
        <input
          type="checkbox"
          name={inputName}
          className="checkbox-input"
          defaultChecked={current}
          onChange={(e) => setCurrent(e.target.checked)}
        />
        <div className="checkbox-icon"></div>
        {label && (
          <div
            className={"checkbox-label" + (inputRequired ? " required" : "")}
          >
            {label}
          </div>
        )}
      </div>
    </>
  );
};

export default Checkbox;
