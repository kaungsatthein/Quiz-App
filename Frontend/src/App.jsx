import Navbar from "./components/Navbar";
import AppDrawer from "./components/AppDrawer";
import { Outlet } from "react-router-dom";

export default function App() {

  return (
    <>
      <AppDrawer />
      <Navbar />
      <Outlet />
    </>
  );
}
