import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>hi static</div>
      <Outlet />
    </div>
  );
}

export default App;
