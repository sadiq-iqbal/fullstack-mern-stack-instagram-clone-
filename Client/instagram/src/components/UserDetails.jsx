import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import GridOnIcon from "@mui/icons-material/GridOn";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const UserDetails = ({ userId }) => {
  return (
    <section className="bg-black text-white min-h-[100vh] max-w-[85%] m-auto">
      <header className="p-1">
        <nav>
          <ul className="flex justify-center items-center gap-20">
            {/* Grid Icon */}
            <li className=" w-[100px] text-center">
              <NavLink
                to={`/profile/${userId}/`}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-t border-gray-400 "
                    : "text-gray-400  "
                }
              >
                <GridOnIcon />
                <span className="text-xs">Posts</span>
              </NavLink>
            </li>
            {/* Slideshow Icon */}
            <li className=" w-[70px] text-center">
              <NavLink
                to="/profile/:userId/reels"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-t border-gray-400 "
                    : "text-gray-400 "
                }
              >
                <SlideshowIcon /> <span className="text-xs">Reels</span>
              </NavLink>
            </li>
            {/* Local Offer Icon */}
            <li className=" w-[70px] text-center">
              <NavLink
                to="/profile/:userId/tagged"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500  border-t border-gray-400 "
                    : "text-gray-400 "
                }
              >
                <LocalOfferIcon />
                <span className="text-xs">Tagged</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="text-white">
        <Outlet />
      </div>
    </section>
  );
};

export default UserDetails;
