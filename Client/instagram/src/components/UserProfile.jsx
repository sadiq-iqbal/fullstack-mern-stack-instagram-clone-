import person from "../assets/images/person.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import UserDetails from "./UserDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
const UserProfile = () => {
  const [isVerfied, setIsVerfied] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [id, setId] = useState("");

  // states for user details
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    website: "",
    username: "",
    posts: [],
    followers: 0,
    following: 0,
  });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowersCount] = useState(0);
  const [following, setFollowingCount] = useState(0);
  // const [profileImage , setProfileImage] = useState('');
  // const [postsCount, setPostsCount] = useState(0);

  // other hooks
  const user = useSelector(selectUser);
  console.log(user);
  const paramId = useParams().id;

  useEffect(() => {
    if (user) {
      if (user?.id === paramId) {
        // If it's the logged-in user, use the Redux state
        setIsPersonal(true);
        setProfile({
          name: user.name,
          username: user.username,
          bio: user.bio,
          website: user.website,
          posts: user.posts,
          followers: user.followers,
          following: user.following,
        });
      }
    } else {
      // Fetch data for another user
      fetch(`http://localhost:3000/api/users/${paramId}`)
        .then((response) => response.json())
        .then((data) => {
          setIsPersonal(false);
          setProfile(data.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [paramId]);

  console.log(paramId);
  return (
    <>
      <section className="  justify-center   min-h-[70vh]">
        <div className="flex gap-10  pt-16    items-center  ">
          <figure className=" ml-32 inline-block border-2 w-44 h-44  rounded-full p-1">
            <img src={person} alt="person image" />
          </figure>
          <div className="main flex flex-col  p-4  w-[60%] ">
            <div>
              <div className="text-white flex gap-3 items-center">
                <div className="flex justify-center gap-1 flex-row items-center">
                  <h3 className="-translate-y-1"> {profile?.username}</h3>
                  {isVerfied && (
                    <VerifiedIcon fontSize="small" color="primary" />
                  )}
                </div>
                {isPersonal ? (
                  <Button type="edit" buttonText={"Edit profile"}></Button>
                ) : (
                  <Button type="follow"></Button>
                )}
                {isPersonal ? (
                  <Button type="message" buttonText={"view archive"}></Button>
                ) : (
                  <Button type="message" buttonText={"Message"}></Button>
                )}
                <div className=" bg-[#5f5e5e] hover:bg-[#414141] w-8 h-8 flex flex-row justify-center items-center  rounded-lg">
                  <PersonAddOutlinedIcon fontSize="small" />
                </div>
              </div>
            </div>
            <div className="text-white mt-3  ">
              <ul className="flex gap-6">
                <li>
                  <div>
                    <span className="font-[600]">
                      {profile?.posts?.length || 100}{" "}
                    </span>{" "}
                    posts
                  </div>
                </li>
                <li>
                  <div>
                    <span className="font-[600]">
                      {profile.followers || 240}{" "}
                    </span>{" "}
                    Followers{" "}
                  </div>
                </li>
                <li>
                  <div>
                    <span className="font-[600]">
                      {profile.following || 304}
                    </span>{" "}
                    Following
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-white mt-6 w-[400px]">
              <ul className="flex flex-col gap-2 ">
                <li>
                  <p>{profile.name || "My Name"}</p>
                </li>
                <li>
                  <p>
                    {profile.bio || (
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate fugiat nisi maiores impedit error minus at,
                        deleniti soluta ipsum dicta?
                      </span>
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
                    {profile.website || (
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque, magnam.
                      </span>
                    )}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr className="mt-[76px] w-[85%] m-auto h-1" />
      <UserDetails></UserDetails>
    </>
  );
};

export default UserProfile;
