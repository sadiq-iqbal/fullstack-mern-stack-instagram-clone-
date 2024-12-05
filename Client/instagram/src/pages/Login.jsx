import React, { useEffect, useState } from "react";
import instalogo from "../assets/images/instawhite.png";
import mobile from "../assets/images/mobile.png";
import { error, loading, selectUser, status } from "../features/user/userSlice";
import loginUser from "../features/user/userThunk";
import { useSelector, useDispatch } from "react-redux";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myLoading = useSelector(loading);
  const errorMessage = useSelector(error);
  const userData = useSelector(selectUser);
  const requestStatus = useSelector(status);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log("Login dispatched");
  };

  useEffect(() => {
    if (requestStatus === "succeed" && !myLoading) {
      console.log(requestStatus, " is it even working");
      console.log(userData); // Log user data
      navigate("/"); // Redirect to home page
    }
  }, [requestStatus, myLoading, userData, navigate]);

  return (
    <div className="w-full bg-black text-white h-[100vh]">
      <div className="flex h-full items-center justify-center flex-row-reverse p-20">
        <div className="mx-10">
          <form
            action=""
            className="flex flex-col items-center border rounded-md border-gray-400 w-[350px] p-10 pb-6 pt-6"
            onSubmit={handleLogin}
          >
            <img src={instalogo} className="w-[200px] mb-6" />
            <div className="flex flex-col gap-3 w-full">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
                className="w-full p-1 placeholder:text-xs bg-[#212020] outline-2 border-[0.5px] rounded-sm placeholder:-translate-y-[0.5px] border-gray-500"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full p-1 placeholder:text-xs bg-[#212020] outline-2 border-[0.5px] rounded-sm placeholder:-translate-y-[0.5px] border-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-[6px] bg-[#3a7ddb] text-white rounded-md font-semibold text-sm mt-4"
              disabled={myLoading}
            >
              {myLoading ? "Logging in..." : "Login"}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            <div className="flex w-full mt-10 flex-row items-center justify-around gap-2">
              <hr className="flex-grow" />
              <span>OR</span>
              <hr className="flex-grow" />
            </div>
            <div className="mt-6">
              <FacebookRoundedIcon color="primary" />{" "}
              <a href="" className="text-sm font-sans text-[#3a7ddb]">
                Login with facebook
              </a>
            </div>
            <div>
              <p className="text-sm font-sans mt-4">Forgot Password ?</p>
            </div>
          </form>
          <div className="border border-gray-400 p-5 rounded-md text-center mt-4">
            don&apos;t have an account ?{" "}
            <button className="font-xl text-blue-600">Sign up</button>
          </div>
        </div>
        <div className="">
          <div>
            <img src={mobile} alt="" />
          </div>
          <img
            src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot2-2x.png?__d=www"
            alt=""
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
