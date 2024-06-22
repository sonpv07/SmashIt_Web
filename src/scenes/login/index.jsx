import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const { loading, login } = useLogin();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(input);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white min-w-100 text-center">
      <div className="">
        <h1 className="text-3xl font-bold text-black">Login</h1>
        <form className="w-80" onSubmit={handleLogin}>
          <div>
            <label className="label text-black">Username: </label>
            <input
              type="text"
              className="w-full px-3 py-2 input bg-stone-200"
              value={input.username}
              onChange={(e) => {
                setInput({ ...input, username: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label text-black">Password: </label>
            <input
              type="password"
              className="w-full px-3 py-2 input bg-stone-200"
              value={input.password}
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full justify-between px-2 py-4">
            <button
              className="w-28 px-4 py-3 bg-gray-400 rounded-xl text-white"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
            <button
              className="w-28 px-4 py-3 bg-green-800 rounded-xl text-white"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
