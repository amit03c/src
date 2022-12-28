import { Route, Routes, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MenuPage from "./pages/MenuPage/MenuPage";
import TakeOffTime from "./pages/TakeOffTime/TakeOffTime";
import Blogs from "./pages/Blogs/Blogs";
import Faqs from "./pages/Faqs/Faqs";

const CreateRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/menu" element={<DefaultLayout />}>
            <Route path="/menu" element={<MenuPage />} />
          </Route>
          <Route path="/take-off-time" element={<DefaultLayout />}>
            <Route path="/take-off-time" element={<TakeOffTime />} />
          </Route>
          <Route path="/blogs" element={<DefaultLayout />}>
            <Route path="/blogs" element={<Blogs />} />
          </Route>
          <Route path="/faqs" element={<DefaultLayout />}>
            <Route path="/faqs" element={<Faqs />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default CreateRoutes;
