import React from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Reel = () => {
  return (
    <div className="w-[37%]  h-[90vh] mx-auto relative">
      <div className="border-2 rounded-md w-[80%] h-full  ">
        <img
          src="https://images.unsplash.com/photo-1515138692129-197a2c608cfd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <aside className="flex flex-col  gap-5 absolute right-4 bottom-14">
        <button>
          <FavoriteBorderIcon fontSize="medium" />
          <p>103.k</p>
        </button>

        <button>
          <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
          <p>2.3k</p>
        </button>
        <button>
          <SendIcon fontSize="medium" />
        </button>
        <button>
          <BookmarkBorderOutlinedIcon fontSize="medium" />
        </button>
        <button>
          <MoreHorizOutlinedIcon fontSize="medium" />
        </button>
      </aside>
    </div>
  );
};

export default Reel;
