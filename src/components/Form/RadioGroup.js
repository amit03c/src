const RadioGroup = ({ data, setData, inputName, labelClass }) => {
  return (
    <>
      <div className="radio-group">
        {data &&
          data.map((item) => (
            <div className="radio-item" key={item._id}>
              <input
                type="radio"
                name={inputName}
                className="radio-input"
                onChange={() => setData(item._id)}
                defaultChecked={item.current}
              />
              <div
                className={
                  "radio-label" + (" " + item.color) + (" " + labelClass)
                }
              >
                {item.name}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RadioGroup;
