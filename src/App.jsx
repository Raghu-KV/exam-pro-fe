import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex w-full">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default App;
