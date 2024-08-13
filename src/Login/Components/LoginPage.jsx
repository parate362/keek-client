import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const LoginPage = () => {
  const [shoPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");  // Initialized with an empty string
  const [password, setPassword] = useState("");  // Initialized with an empty string
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://keek-server.vercel.app/api/user/signin-email`, { email, password })
    .then((result) => {
      console.log('Sign in successful:', result);
      setSuccess('Sign in successful!');
      setError('');
      navigate("/home");  // navigate to the home page
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      setError('Sign in failed. Please try again.');
      setSuccess('');
    });
};
  return (
    <div>
      <div className="ml-11 mt-[85px]">
        <h1 className="mb-10">
          <span className="font-semibold text-[32px] text-[#384EDD]">
            KEEK |{" "}
          </span>
          <span className="text-[24px]">Brands</span>
        </h1>
        <div className="mb-[26px]">
          <h2 className="text-[34px]">Welcome back!</h2>
          <p className="text-[#8E9090]">
            Glad to see you again!, please enter your details.
          </p>
        </div>
        <div className="flex items-center gap-5 mb-[34px]">
          <button className="border py-[14px] px-[80px] rounded-lg flex items-center">
            <FcGoogle className="text-2xl mr-3" /> <span>Google</span>
          </button>
          <Link to={"/mobilesignup"}>
            <button className="border py-[14px] px-[44px] rounded-lg flex items-center">
              <FaMobileAlt className="text-2xl mr-3 opacity-60" />{" "}
              <span>Mobile number</span>
            </button>
          </Link>
        </div>
        <div className="flex items-center mb-5">
          <hr className="w-1/2 text-[#B1B2B2] " />
          <span className="px-6 text-sm text-[#B1B2B2]">OR</span>
          <hr className="w-1/2 text-[#B1B2B2]" />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="" className="text-lg block">
                Email<span className="text-[#06F]">*</span>
              </label>
              <input
                className="border border-[#363939] px-5 py-3 w-[500px] rounded-lg"
                type="email"
                name="email"
                id="email"
                placeholder="John.doe@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="" className="text-lg block">
                Password<span className="text-[#06F]">*</span>
              </label>
              <input
                className="border border-[#363939] px-5 py-3 w-[500px] rounded-lg"
                type={`${shoPass ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => {
                  setShowPass(!shoPass);
                }}
                className="absolute top-11 right-6 pl-3 flex items-center"
              >
                {shoPass ? (
                  <IoEyeOutline className="text-2xl opacity-50" />
                ) : (
                  <BsEyeSlash className="text-2xl opacity-50" />
                )}
              </div>
            </div>
            <Link to="/forgotpass">
              <div className="text-[#06F] text-end mt-2 mb-[34px]">
                Forget password?
              </div>
            </Link>
            <div className="mb-[42px]">
              <button
                type="submit"
                className="w-full text-center text-white py-4 rounded-[10px] bg-[#0066FF]"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mb-[26px]">
            <hr className="text-[#B1B2B2]" />
          </div>
          <div className="text-center mb-6">
            Don’t have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-[#06F]">Sign up</span>
            </Link>
          </div>
          <div className="text-center">
            Don’t have an account?{" "}
            <span className="text-[#06F]">
              Influencers page
              <RiArrowRightUpLine className="inline-block text-lg text-[#06F]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
