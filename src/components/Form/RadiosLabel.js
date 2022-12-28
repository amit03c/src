import Radio from "./Radio";

const RadiosLabel = ({
  setRadio,
  label,
  labelClasses,
  inputRequired,
  data,
}) => {
  return (
    <>
      <div className="input">
        {label && (
          <div className="input-options">
            <div
              className={
                "input-label" +
                (" " + labelClasses) +
                (inputRequired ? " required" : "")
              }
            >
              {label}
            </div>
          </div>
        )}
        <div className="input-radio-group">
          {data.map((item, index) => (
            <Radio
              key={index}
              id={item._id}
              label={item.label}
              inputName={item.inputName}
              current={item.current}
              setCurrent={setRadio}
              
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RadiosLabel;
