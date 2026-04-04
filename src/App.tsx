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
      <Header />

      <div style={{ minHeight: "calc(100vh - 64px)", background: "#f5f7ff", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
