type StatCardProps = {
  title: string;
  value: string;
  description?: string;
};

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "22px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        {title}
      </p>

      <h3
        style={{
          margin: "10px 0 0",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </h3>

      {description && (
        <p
          style={{
            margin: "6px 0 0",
            color: "var(--text-muted)",
            fontSize: "12px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}