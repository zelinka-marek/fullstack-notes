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
        <label htmlFor="username">username</label>{" "}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}
