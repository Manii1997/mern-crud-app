import { Link, useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";

import PasswordInput from "../../components/Input/PasswordInput";
import { useEffect, useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred, please try again");
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center mt-28">
      <div className="w-96 lg:border mt-7 flex p-5 rounded">
        <form className="flex flex-col gap-3 w-full" onSubmit={handleLogin}>
          <h4 className="text-2xl mb-5 font-bold text-center">Login</h4>

          <label className="input input-bordered flex items-center gap-2">
            <IoIosMail className="opacity-70" />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm pb-2">{error}</p>}
          <button type="submit" className="btn btn-info bg-sky-600 text-white">
            Login
          </button>
          <p className="text-sm text-center">
            Not registered yet?{" "}
            <Link to="/signup" className="underline text-sky-600">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
