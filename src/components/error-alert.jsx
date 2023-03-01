import PropTypes from "prop-types";

export function ErrorAlert(props) {
  const { message } = props;

  return (
    <div className="error" role="alert">
      {message}
    </div>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
