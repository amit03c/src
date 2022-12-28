import Button from "../Form/Button";

const Confirm = ({
  icon,
  iconColorClass,
  title,
  text,
  isOpen,
  confirmClose = () => {},
  confirmSubmit = () => {},
}) => {
  return (
    <>
      <div className={"confirm-box" + (isOpen ? " active" : "")}>
        <div className="confirm-box-backdrop"></div>
        <div className="confirm-box-inner">
          <div className="confirm-box-content">
            <div className={"confirm-box-icon" + (" " + iconColorClass)}>
              <i className={"fa-fw" + (" " + icon)}></i>
            </div>
            <div className="confirm-box-title">{title}</div>
            <div className="confirm-box-text">{text}</div>
            <div className="confirm-box-actions">
              <Button
                label={"Cancel"}
                classes={"main-button-alt w-100"}
                functions={confirmClose}
              />
              <Button
                label={"Delete"}
                classes={"w-100"}
                functions={confirmSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
