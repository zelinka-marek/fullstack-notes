import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Togglable = forwardRef((props, ref) => {
  const {
    openButtonLabel,
    closeButtonLabel = "Cancel",
    defaultVisible = false,
    children,
  } = props;

  const [visible, setVisible] = useState(defaultVisible);

  const hideWhenVisible = { display: visible ? "none" : undefined };
  const showWhenVisible = { display: visible ? undefined : "none" };

  const toggleVisibility = () => setVisible((visible) => !visible);

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          {openButtonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>
          {closeButtonLabel}
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  openButtonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string,
  defaultVisible: PropTypes.bool,
  children: PropTypes.element.isRequired,
};
