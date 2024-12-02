import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import PostsPage from "./pages/PostsPage";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import UserProfile from "./components/UserProfile";
import UserPosts from "./components/UserPosts";
import UserReels from "./components/UserReels";
import ReelsPage from "./pages/ReelsPage";
import Reel from "./components/Reel";
import Login from "./components/login";

// Define routes using createBrowserRouter
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the root layout
    children: [
      {
        path: "/",
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <PostsPage />,
          },
          {
            path: "/explore",
            element: <Feed></Feed>,
          },
          {
            path: "/profile/:id",
            element: <ProfilePage></ProfilePage>,
            children: [
              {
                path: "",
                element: <UserProfile></UserProfile>,
                children: [
                  {
                    path: "posts",
                    element: <UserPosts></UserPosts>,
                  },
                  {
                    path: "reels",
                    element: <UserReels></UserReels>,
                  },
                ],
              },
            ],
          },
          {
            path: "reels",
            element: <ReelsPage></ReelsPage>,
            // children: [
            //   {
            //     path: "",
            //     element: <Reel></Reel>,
            //   },
            // ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>page not found </h1>,
  },
]);

// Render the app with RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
