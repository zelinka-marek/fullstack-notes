import PropTypes from "prop-types";
import { useState } from "react";

const initialValues = { username: "", password: "" };

export function LoginForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(formData);

    setFormData(initialValues);
  };

  const handleChange = (event) => {
    const { type, name } = event.target;

    setFormData((note) => ({
      ...note,
      [name]: type === "checkbox" ? event.target.checked : event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>{" "}
        <input
          type="text"
          name="username"
          id="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>{" "}
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
