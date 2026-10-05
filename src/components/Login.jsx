import { useState } from "react";
import {
  Lock,
  User,
  Wallet,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

const MAIN_PASSWORD = "admin00123";

function Login({ onLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password !== MAIN_PASSWORD) {
      setError("Incorrect password.");
      return;
    }

    const user = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
    };

    setError("");
    onLogin(user);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <Wallet size={25} />
          </div>

          <span>ExpenseFlow</span>
        </div>

        <div className="login-header">
          <h1>Welcome back</h1>

          <p>
            Enter your details to access your
            account
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-name-row">
            <div className="login-field">
              <label>First Name</label>

              <div className="login-input">
                <User size={17} />

                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="login-field">
              <label>Last Name</label>

              <div className="login-input">
                <User size={17} />

                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>

            <div className="login-input">
              <Lock size={17} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;