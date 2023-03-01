import { useState } from "react";

export function Togglable(props) {
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
}
