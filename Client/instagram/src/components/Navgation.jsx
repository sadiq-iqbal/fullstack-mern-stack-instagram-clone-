import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

function Navgation() {
  const navItems = [
    {
      id: -1,
      name: <h1 className="text-xl font-mono text-left ">instagram</h1>,
      path: "/more",
    },
    {
      id: 0,
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      id: 1,
      name: "Search",
      path: "/search",
      icon: <SearchIcon />,
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
      icon: <ExploreIcon />,
    },
    {
      id: 3,
      name: "Reels",
      path: "/reels",
      icon: <MovieCreationIcon />,
    },
    {
      id: 4,
      name: "Messages",
      path: "/messages",
      icon: <ChatBubbleOutlineIcon />,
    },
    {
      id: 5,
      name: "Notifications",
      path: "/notifications",
      icon: <NotificationsIcon />,
    },
    {
      id: 6,
      name: "Create",
      path: "/create",
      icon: <AddBoxIcon />,
    },
    {
      id: 7,
      name: "Profile",
      path: "/profile",
      icon: <AccountCircleIcon />,
    },
    {
      id: 8,
      name: "More",
      path: "/more",
      icon: <MoreHorizIcon />,
    },
  ];

  return (
    <ul className="md:flex md:flex-col md:justify-between md:overflow-y-hidden  md:h-full md:p-4">
      {navItems.map((item) => (
        <li key={item.id}>
          <Link
            to={item.path}
            className="active:font-bold hover:bg-[rgba(56,55,55,0.6)] p-4 rounded-md transition-all delay-70 flex items-center"
          >
            {" "}
            <span className="mr-4 font-extrabold">{item.icon}</span>
            {item.name}
          </Link>
          {/* Render the icon */}
        </li>
      ))}
    </ul>
  );
}

export default Navgation;
