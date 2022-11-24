import { Routes, Route, Outlet } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { JobPage } from "./pages/JobPage";
import { JobDetailPage } from "./pages/JobDetailPage";

import NavbarComp from "./components/NavbarComp";

function App() {
  const Layout = () => {
    return (
      <div>
        <NavbarComp />
        <Outlet />
      </div>
    );
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="job" element={<JobPage />} />
          <Route path="detail/:id" element={<JobDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
