export function ErrorAlert(props) {
  const { message } = props;

  return <div className="error">{message}</div>;
}
