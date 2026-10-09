
import { useState } from "react";
import {
  Lock,
  User,
  Wallet,
  Eye,
  EyeOff,
  LogIn,
  Mail,
  UserPlus,
} from "lucide-react";
import { supabase } from "../lib/supabase";

function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      mode === "signup" &&
      (!firstName.trim() || !lastName.trim())
    ) {
      setError("Please enter your first and last name.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error: authError } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                full_name: `${firstName.trim()} ${lastName.trim()}`,
              },
            },
          });

        if (authError) {
          throw authError;
        }

        if (data.session && data.user) {
          onLogin({
            id: data.user.id,
            email: data.user.email,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            name: `${firstName.trim()} ${lastName.trim()}`,
          });
        } else {
          setMessage(
            "Account created! Please check your email and click the confirmation link before logging in."
          );
          setMode("login");
          setPassword("");
        }
      } else {
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (authError) {
          throw authError;
        }

        const authUser = data.user;
        const metadata = authUser.user_metadata || {};
        const userFirstName = metadata.first_name || "";
        const userLastName = metadata.last_name || "";

        onLogin({
          id: authUser.id,
          email: authUser.email,
          firstName: userFirstName,
          lastName: userLastName,
          name:
            metadata.full_name ||
            `${userFirstName} ${userLastName}`.trim() ||
            authUser.email,
        });
      }
    } catch (err) {
      if (err.message?.toLowerCase().includes("invalid login")) {
        setError("Incorrect email or password.");
      } else if (err.message?.toLowerCase().includes("already registered")) {
        setError("This email is already registered. Please log in.");
      } else if (err.message?.toLowerCase().includes("password")) {
        setError(err.message);
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setMessage("");
    setPassword("");
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
          <h1>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>

          <p>
            {mode === "login"
              ? "Enter your details to access your account"
              : "Create an account to manage your expenses"}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="login-name-row">
              <div className="login-field">
                <label>First Name</label>

                <div className="login-input">
                  <User size={17} />

                  <input
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                    required
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
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="login-field">
            <label>Email</label>

            <div className="login-input">
              <Mail size={17} />

              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>

            <div className="login-input">
              <Lock size={17} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="login-message" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {mode === "login" ? (
              <LogIn size={18} />
            ) : (
              <UserPlus size={18} />
            )}

            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>

          <p style={{ textAlign: "center", marginTop: "16px" }}>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={changeMode}
              disabled={loading}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--primary-color, #6366f1)",
                cursor: "pointer",
                font: "inherit",
                fontWeight: 600,
              }}
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
