import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, loading, error } from "../features/user/userSlice";
import loginUser from "../features/user/userThunk";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [merror, setError] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state);

  const isLoading = useSelector(loading); // Assuming this selector exists
  const errorMessage = useSelector(error); // Assuming this selector exists
  const user = useSelector(selectUser);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Dispatch login action here
    // Example: dispatch(login({ email, password }));
    dispatch(loginUser({ email, password }));
    if (errorMessage) {
      setError(errorMessage);
    }

    // Reset form fields
    console.log(user);
    console.log(token);
  };

  return (
    <div className="w-[70%] mx-auto p-8">
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col gap-8 p-10 border-1 w-1/2 rounded-lg shadow-md bg-black"
      >
        <h1 className="text-center text-white text-2xl">Login</h1>
        <div>
          <input
            className="w-full p-4"
            type="email"
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
        <button className="w-1/2 mx-auto bg-blue-300 p-4">
          {isLoading ? "Loading..." : "Log in"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <div className="text-white text-center flex flex-row gap-4 mx-auto">
          <span>Don't have an account?</span>
          <button className="text-green-700"> Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
