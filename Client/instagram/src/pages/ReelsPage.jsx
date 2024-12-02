import { Outlet } from "react-router-dom";
import Reel from "../components/Reel";

const ReelsPage = () => {
  return (
    <section className="text-white max-h-[100vh] overflow-y-auto ">
      Reels page
      <div className="flex flex-col gap-8">
        <Reel></Reel>
        <Reel></Reel>
        <Reel></Reel>
      </div>
    </section>
  );
};

export default ReelsPage;
