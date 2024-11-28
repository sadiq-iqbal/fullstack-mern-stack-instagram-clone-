import { Outlet } from "react-router-dom";
import Navgation from "../components/Navgation";

function PageLayout({ children }) {
  console.log(children);
  return (
    <main>
      <nav className="  dark:bg-black md:fixed md:top-0 md:bottom-0 md:w-[250px] dark:text-white">
        <Navgation />
      </nav>
      <section className="bg-black h-32 ml-[250px]">
        <Outlet></Outlet>
      </section>
    </main>
  );
}

export default PageLayout;
