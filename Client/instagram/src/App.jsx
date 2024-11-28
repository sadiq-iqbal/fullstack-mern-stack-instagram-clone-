import { Outlet } from "react-router-dom";
import PageLayout from "./pages/PageLayout";

const App = () => {
  return (
    <div className="bg-red-400">
      <Outlet></Outlet>
    </div>
  );
};

export default App;
