export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">D</div>

        <div>
          <h2>DocAI</h2>
          <span>Document Intelligence</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="sidebar-section-title">MAIN MENU</p>

        <a href="#" className="sidebar-link active">
          <span className="sidebar-icon">⌂</span>
          <span>Home</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">↑</span>
          <span>Upload Documents</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">▣</span>
          <span>My Documents</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">✦</span>
          <span>AI Q&amp;A</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">⌕</span>
          <span>Search</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">⇄</span>
          <span>Compare Documents</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">▤</span>
          <span>Summarization &amp; Insights</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">◷</span>
          <span>Question History</span>
        </a>

        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </a>
      </nav>

      <div className="sidebar-profile">
        <div className="profile-avatar">U</div>

        <div className="profile-info">
          <strong>User</strong>
          <span>Employee Account</span>
        </div>
      </div>
    </aside>
  );
}