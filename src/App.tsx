import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      {/* Bài 1: Header hiển thị thông tin user từ UserContext */}
      <Header />

      {/* MAIN CONTENT */}
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#f5f7ff" }}>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          {/* Bài 2: Route đăng nhập giả lập */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
