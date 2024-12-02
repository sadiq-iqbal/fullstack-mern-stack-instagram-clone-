import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="w-[70%] mx-auto p-8  ">
      <form
        onSubmit={handleLoginSubmit}
        action=""
        className=" flex flex-col gap-8 p-10 border-1  w-1/2
       rounded-lg shadow-md bg-black "
      >
        <h1 className=" text-center text-white text-2xl">Login</h1>
        <div>
          <input
            className="w-full p-4"
            type="
            email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full p-4"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-1/2 mx-auto bg-blue-300 p-4">Log in</button>
        <div className="text-white text-center flex flex-row  gap-4 mx-autoe">
          <span>Don't have an account?</span>
          <button className="text-green-700"> Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
