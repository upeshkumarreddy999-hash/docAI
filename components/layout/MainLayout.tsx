import Sidebar from "./Sidebar";
import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}