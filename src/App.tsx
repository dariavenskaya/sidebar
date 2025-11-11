import "./App.css";
import AppMenu from "./components/AppMenu";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Supplies } from "./pages/Inventory/Supplies";
import { Products } from "./pages/Inventory/Products";

function App() {
  return (
    <BrowserRouter basename="/sidebar">
      <AppMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/products" element={<Products />} />
        <Route path="/supplies" element={<Supplies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
