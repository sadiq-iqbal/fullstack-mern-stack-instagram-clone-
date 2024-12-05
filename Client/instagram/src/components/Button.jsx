import React from "react";

export const Button = ({
  type = "follow",
  isFollowing = false,
  buttonText,
  classes = "",
  onClick,
}) => {
  const bg =
    type === "follow"
      ? "hover:bg-blue-500  bg-[#0095f6]"
      : "bg-[#5f5e5e] hover:bg-[#414141]";
  const commonClasses = `min-w-[80px] px-4 transition-all py-1 text-white  rounded-lg  ${bg}`;
  const text = buttonText || (isFollowing ? "Following" : "Follow");

  return (
    <button className={`${commonClasses} ${classes}`} onClick={onClick}>
      {text}
    </button>
  );
};
