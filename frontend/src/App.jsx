import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { TABS } from "./data/data";
import Header from "./components/layout/Header";
import WorkTab from "./components/work/WorkTab";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import InfoTab from "./components/info/InfoTab";

function App() {
  const [minHeader, setMinHeader] = useState(false);

  useEffect(() => {
    const panel = document.querySelector(".panel");
    if (!panel) return;

    const handleScroll = () => {
      setMinHeader(panel.scrollTop > 20);
    };

    panel.addEventListener("scroll", handleScroll);

    return () => panel.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <BrowserRouter>
      <div className="shell">
        <div className="bg" />

        <Header tabs={TABS} minimized={minHeader} />

        <main className="panel">
          <Routes>
            <Route path="/" element={<InfoTab />} />
            <Route path="/projects" element={<WorkTab />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
