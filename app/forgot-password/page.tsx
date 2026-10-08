"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setIsSuccess(false);

    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
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
            Forgot your password?
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-secondary)",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Enter your email address and we will send you instructions to
            reset your password.
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 14px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "var(--radius-md)",
              color: "var(--success)",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            Password reset instructions have been sent to your email.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "22px" }}>
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
                setIsSuccess(false);
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <p
          style={{
            margin: "24px 0 0",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "13px",
          }}
        >
          Remember your password?{" "}
          <a
            href="/login"
            style={{
              color: "var(--primary)",
              fontWeight: 600,
            }}
          >
            Back to Sign In
          </a>
        </p>
      </div>
    </main>
  );
}