import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useParams().id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/posts/${userId}`
        );
        setIsLoading(false);
        setPosts(response.data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [userId]);

  return (
    <div className="text-white mt-10">
      <ul className="grid grid-cols-3 gap-1">
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          posts.map((post) => (
            <li key={post._id} className="relative w-full h-0 pb-[100%] group">
              {/* Post Image */}
              <img
                src={post.mediaUrl}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover"
              />

              {/* Overlay with details */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                <div className="flex gap-7 ">
                  <p className="text-white text-lg font-semibold">
                    <FavoriteIcon></FavoriteIcon> : {post.likes.length}
                  </p>
                  <p className="text-white text-lg font-semibold">
                    <CommentIcon /> : {post.comments.length}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserPosts;
