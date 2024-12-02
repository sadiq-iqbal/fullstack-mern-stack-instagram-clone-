import React from "react";
import Circle from "@mui/icons-material/Circle";
function Stories() {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w-full bg-gray-900 flex flex-row  justify-between items-centergap-2 h-[70px]">
      {stories.map((story) => {
        return <Circle key={story} fontSize="large"></Circle>;
      })}
    </div>
  );
}

export default Stories;
