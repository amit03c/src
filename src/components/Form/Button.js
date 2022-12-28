import React from 'react';

const Button = ({label, labelClasses, classes, icon, iconPosition, functions}) => {
  return (
    <>
      <button type="button" className={"main-button" + (" " + classes)} onClick={functions}>
        { iconPosition === 'left' &&
          <i className={"fa-fw" + (" " + icon)}></i>
        }
        { label &&
          <div className={"button-label" + (" " + labelClasses)}>{label}</div>
        }
        { iconPosition === 'right' &&
          <i className={"fa-fw" + (" " + icon)}></i>
        }
      </button>
    </>
  );
};

export default Button;