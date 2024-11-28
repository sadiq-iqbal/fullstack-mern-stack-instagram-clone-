import React from "react";
import Stories from "../components/Stories";

function Feed() {
  return (
    <div className="bg-black text-white min-h-[100vh]">
      <section className="flex justify-between">
        <div className="flex-grow w-[64%]">
          <Stories></Stories>
          {/* <Posts></Posts> */}
          <div className="p-10"></div>
        </div>
        <div className="w-[330px] border h-[100vh]">suggestions</div>
      </section>
    </div>
  );
}

export default Feed;
