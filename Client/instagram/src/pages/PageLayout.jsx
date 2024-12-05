import { Outlet } from "react-router-dom";
import Navgation from "../components/Navgation";
import { useState } from "react";
function PageLayout({ children }) {
  // const [count, setCount] = useState(0);
  console.log(children);
  return (
    <main>
      <nav className="  dark:bg-black md:fixed md:top-0  border-[#8886867d] border-r-[1px] md:bottom-0 md:w-[250px] dark:text-white">
        <Navgation />
      </nav>
      <section className="bg-black h-[100vh] overflow-y-auto ml-[250px]">
        <Outlet></Outlet>
      </section>
    </main>
  );
}

export default PageLayout;
