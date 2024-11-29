import React from "react";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <article>
      <h1>Profile Page</h1>
      <Outlet></Outlet>
    </article>
  );
};

export default ProfilePage;
