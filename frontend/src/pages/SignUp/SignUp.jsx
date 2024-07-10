import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      } else {
        setError(
          response.data.message ||
            "An unexpected error occurred, please try again"
        );
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
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-5 font-bold text-center">SignUp</h4>
          <label className="input input-bordered flex items-center gap-2">
            <FaUser className="opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
            Create an Account
          </button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-sky-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
