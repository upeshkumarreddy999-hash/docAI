type LoadingStateProps = {
  title?: string;
  message?: string;
  variant?: "default" | "page" | "inline" | "button";
};

export default function LoadingState({
  title = "Loading...",
  message = "Please wait while we prepare the information.",
  variant = "default",
}: LoadingStateProps) {
  if (variant === "button") {
    return (
      <span className="button-loading" aria-live="polite" aria-label={title}>
        <span
          className="loading-spinner button-loading-spinner"
          aria-hidden="true"
        />
        <span>{title}</span>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className="loading-state-inline" aria-live="polite">
        <span
          className="loading-spinner loading-spinner-small"
          aria-hidden="true"
        />
        <span>{title}</span>
      </span>
    );
  }

  return (
    <section
      className={`loading-state${
        variant === "page" ? " loading-state-page" : ""
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <span className="loading-spinner" aria-hidden="true" />

      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}