export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div>
          <h1>Welcome back</h1>
          <p>Manage your documents and get answers with AI.</p>
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-button" type="button" aria-label="Notifications">
          🔔
        </button>

        <div className="header-user">
          <div className="header-avatar">U</div>

          <div className="header-user-info">
            <strong>User</strong>
            <span>Employee</span>
          </div>

          <span className="header-chevron">⌄</span>
        </div>
      </div>
    </header>
  );
}