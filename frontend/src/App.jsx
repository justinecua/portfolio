import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { TABS } from "./data/data";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import WorkTab from "./components/work/WorkTab";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import InfoTab from "./components/info/InfoTab";
import Instructions from "./components/exam/database/instructions";
import Certificates from "./components/certificates/certificates";
import Prototypes from "./components/prototypes/Prototypes";
import ChatWidget from "./components/chat/ChatWidget";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPage from "./components/admin/AdminPage";

// client prototypes live outside the site chrome and load on demand
const UrbanCoffee = lazy(() => import("./prototypes/urbancoffee"));

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="shell">
      <SiteHeader tabs={TABS} />

      <main className="page">
        <Routes>
          <Route path="/" element={<InfoTab />} />
          <Route path="/projects" element={<WorkTab />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/exam/database/" element={<Instructions />} />
          <Route path="/certificates/" element={<Certificates />} />
          <Route path="/prototypes" element={<Prototypes />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin lives outside the public site chrome */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/:section" element={<AdminPage />} />
        <Route
          path="/prototype/urbancoffee"
          element={
            <Suspense fallback={null}>
              <UrbanCoffee />
            </Suspense>
          }
        />
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
