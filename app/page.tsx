import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div>
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Dashboard
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "var(--text-secondary)",
              fontSize: "14px",
            }}
          >
            Overview of your documents and AI activity.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          {/* Total Documents */}
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
              }}
            >
              Total Documents
            </p>

            <h3
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "var(--text-primary)",
              }}
            >
              0
            </h3>
          </div>

          {/* Questions Asked */}
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
              }}
            >
              Questions Asked
            </p>

            <h3
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "var(--text-primary)",
              }}
            >
              0
            </h3>
          </div>

          {/* Documents Processed */}
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
              }}
            >
              Documents Processed
            </p>

            <h3
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "var(--text-primary)",
              }}
            >
              0
            </h3>
          </div>

          {/* Storage Used */}
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
              }}
            >
              Storage Used
            </p>

            <h3
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "var(--text-primary)",
              }}
            >
              0 MB
            </h3>
          </div>
        </div>

        {/* Welcome Section */}
        <div
          style={{
            marginTop: "28px",
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              color: "var(--text-primary)",
            }}
          >
            Welcome to DocAI
          </h3>

          <p
            style={{
              marginTop: "8px",
              color: "var(--text-secondary)",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            Upload your documents, ask questions, search information, compare
            documents, and get AI-powered insights from your files.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}