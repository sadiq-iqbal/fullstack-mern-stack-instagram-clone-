import person from "../assets/images/person.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { Button } from "./Button";
const UserProfile = () => {
  const [isVerfied, setIsVerfied] = useState(true);
  //   dummy values to prevent application from crashing
  let posts;
  let followers;
  let following;
  let bio;
  let name;
  let website;
  return (
    <section className="  justify-center   min-h-[70vh]">
      <div className="flex gap-10  pt-16    items-center  ">
        <figure className=" ml-32 inline-block border-2 w-44 h-44  rounded-full p-1">
          <img src={person} alt="person image" />
        </figure>
        <div className="main flex flex-col  p-4  w-[50%] ">
          <div>
            <div className="text-white flex gap-3 items-center">
              <div className="flex justify-center gap-1 flex-row items-center">
                <h3 className="-translate-y-1">username</h3>
                {isVerfied && <VerifiedIcon fontSize="small" color="primary" />}
              </div>
              <Button type="follow"></Button>
              <Button type="message" buttonText={"Message"}></Button>
              <div className=" bg-[#5f5e5e] hover:bg-[#414141] w-8 h-8 flex flex-row justify-center items-center  rounded-lg">
                <PersonAddOutlinedIcon fontSize="small" />
              </div>
            </div>
          </div>
          <div className="text-white mt-3  ">
            <ul className="flex gap-6">
              <li>
                <div>
                  <span className="font-[600]">{posts || 100} </span> posts
                </div>
              </li>
              <li>
                <div>
                  <span className="font-[600]">{followers || 240} </span>{" "}
                  Followers{" "}
                </div>
              </li>
              <li>
                <div>
                  <span className="font-[600]">{following || 304}</span>{" "}
                  Following
                </div>
              </li>
            </ul>
          </div>
          <div className="text-white mt-6 w-[350px]">
            <ul className="flex flex-col gap-2 ">
              <li>
                <p>{name || "My Name"}</p>
              </li>
              <li>
                <p>
                  {bio || (
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate fugiat nisi maiores impedit error minus at,
                      deleniti soluta ipsum dicta?
                    </p>
                  )}
                </p>
              </li>
              <li className=" text-blue-300   cursor-pointer">
                <p className="flex gap-2 items-center">
                  <span>
                    <LinkIcon
                      fontSize="small"
                      style={{ color: "white" }}
                    ></LinkIcon>
                  </span>
                  {website || (
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque, magnam.
                    </p>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
