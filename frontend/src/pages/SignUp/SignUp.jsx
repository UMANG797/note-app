import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../../utils/helper";
import axiosInstace from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("please enter your name");
      return;
    }
    if (!validEmail(email)) {
      setError("please enter a valid email address");
      return;
    }
    if (!password) {
      setError("please enter a valid password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstace.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        console.log(response.data);
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An expected error occured.Please try again");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              SignUp
            </button>
            <p className="text-sm text-center mt-4">
              Not registerd yet?{""}
              <Link
                to="/login"
                className="font-medium  underline  text-blue-600 pl-2"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
