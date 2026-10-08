"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Login validation successful. Backend authentication will be connected later.");
    }, 1000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--background)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "36px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--primary)",
              color: "var(--white)",
              borderRadius: "var(--radius-md)",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            D
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: "var(--text-primary)",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              DocAI
            </h2>

            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "11px",
              }}
            >
              AI Document Platform
            </span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-secondary)",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Sign in to continue to your DocAI account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "7px",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 12px",
                border: `1px solid ${
                  emailError ? "var(--error)" : "var(--border)"
                }`,
                borderRadius: "var(--radius-md)",
                outline: "none",
                color: "var(--text-primary)",
                background: "var(--white)",
                fontSize: "14px",
              }}
            />

            {emailError && (
              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--error)",
                  fontSize: "12px",
                }}
              >
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "14px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "7px",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("");
              }}
              placeholder="Enter your password"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 12px",
                border: `1px solid ${
                  passwordError ? "var(--error)" : "var(--border)"
                }`,
                borderRadius: "var(--radius-md)",
                outline: "none",
                color: "var(--text-primary)",
                background: "var(--white)",
                fontSize: "14px",
              }}
            />

            {passwordError && (
              <p
                style={{
                  margin: "6px 0 0",
                  color: "var(--error)",
                  fontSize: "12px",
                }}
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember + Forgot Password */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "22px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: "var(--text-secondary)",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="/forgot-password"
              style={{
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: "44px",
              border: "none",
              borderRadius: "var(--radius-md)",
              background: isLoading
                ? "var(--text-muted)"
                : "var(--primary)",
              color: "var(--white)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <p
          style={{
            margin: "24px 0 0",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "13px",
          }}
        >
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            style={{
              color: "var(--primary)",
              fontWeight: 600,
            }}
          >
            Create account
          </a>
        </p>
      </div>
    </main>
  );
}